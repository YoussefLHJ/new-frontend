import {
    Component, ChangeDetectionStrategy, TemplateRef, computed, contentChild,
    effect, inject, input, output, signal, untracked, viewChild, DestroyRef, OnInit
} from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { TranslateService } from '@ngx-translate/core';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';
import { ExportService } from '@/app/zynerator/util/Export.service';
import { DataGridToolbarComponent } from '../data-grid-toolbar/data-grid-toolbar.component';
import { ViewDetailDialogComponent } from '../../view/view-detail-dialog/view-detail-dialog.component';
import {
    ServerColumnConfig, FilterCondition, GroupOption, GroupingConfig,
    DataLoadFn, ExportLoadFn
} from '../../models/data-grid.models';
import { CriteriaMapperService } from '../../services/criteria-mapper.service';
import { DataGridGroupingService } from '../../services/data-grid-grouping.service';

@Component({
    selector: 'app-server-data-table',
    imports: [
        FormsModule, TableModule, ButtonModule, ToolbarModule,
        IconFieldModule, InputIconModule, InputTextModule, TagModule, TooltipModule,
        PaginatorModule,
        NgTemplateOutlet, SignalTranslatePipe, DataGridToolbarComponent, ViewDetailDialogComponent, DatePipe
    ],
    templateUrl: './server-data-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerDataTableComponent implements OnInit {
    // --- Queries ---
    dt = viewChild<Table>('dt');
    toolbar = viewChild(DataGridToolbarComponent);
    customCellTpl = contentChild<TemplateRef<any>>('customCell');

    // --- Configuration Inputs ---
    columns = input<ServerColumnConfig[]>([]);
    title = input('');
    storageKey = input('');
    groupOptions = input<GroupOption[]>([]);
    groupingConfig = input<GroupingConfig>({});
    globalFilterFields = input<string[]>([]);
    dataKey = input('id');
    exportFileName = input('export');
    tableMinWidth = input('60rem');
    emptyMessage = input('common.noData');
    customCellFields = input<string[]>([]);
    initialRows = input(10);

    // --- Data Loading Inputs ---
    dataLoader = input.required<DataLoadFn>();
    criteriaFactory = input.required<() => any>();
    exportDataLoader = input<ExportLoadFn>();

    // --- Outputs ---
    onCreate = output<void>();
    onEdit = output<any>();
    onDelete = output<any>();
    onDeleteSelected = output<any[]>();

    // --- Services ---
    private readonly criteriaMapper = inject(CriteriaMapperService);
    private readonly groupingService = inject(DataGridGroupingService);
    private readonly exportService = inject(ExportService);
    readonly translate = inject(TranslateService);
    private readonly destroyRef = inject(DestroyRef);

    // --- State ---
    items = signal<any[]>([]);
    displayItems = signal<any[]>([]);
    totalRecords = signal(0);
    loading = signal(false);
    selectedItems = signal<any[]>([]);
    viewDialogVisible = false;
    viewItem: any = null;
    activeGroupFields: string[] = [];
    activeFilters: FilterCondition[] | null = null;
    expandedGroups: { [key: string]: boolean } = {};
    groupCountMap = new Map<string, number>();
    cachedVisibleColumnCount = signal(0);

    currentPage = 0;
    currentRows = 10;
    paginatorFirst = 0;

    private allPageItems: any[] = [];
    private globalFilterTimeout: ReturnType<typeof setTimeout> | undefined;

    // --- Computed ---
    cachedGlobalFilterFields = computed(() => {
        const fields = [...this.globalFilterFields()];
        for (const col of this.columns()) {
            if (col.type === 'entity') {
                fields.push(`_${col.field}_label`);
            }
        }
        return fields;
    });

    /** Whether backend grouping is active for the current configuration. */
    private get isBackendGrouping(): boolean {
        const config = this.groupingConfig();
        return !!config.backendGrouping && this.activeGroupFields.length > 0;
    }

    constructor() {
        effect(() => {
            const columns = this.columns();
            untracked(() => {
                this.cachedVisibleColumnCount.set(columns.filter(c => c.visible !== false).length);
            });
        });

        this.destroyRef.onDestroy(() => clearTimeout(this.globalFilterTimeout));
    }

    ngOnInit() {
        this.currentRows = this.initialRows();
        this.loadData();
    }

    // ─── Server Data Loading ────────────────────────────────────────────

    loadData() {
        this.loading.set(true);
        const criteria = this.criteriaMapper.buildCriteria(
            this.criteriaFactory(),
            this.activeFilters,
            this.columns(),
            this.currentPage,
            this.currentRows
        );

        // Attach groupBy to criteria when backend grouping is enabled
        if (this.isBackendGrouping) {
            const key = this.groupingConfig().backendGroupCriteriaKey || 'groupBy';
            criteria[key] = [...this.activeGroupFields];
        }

        this.dataLoader()(criteria)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: result => {
                    this.items.set(result.list);
                    this.totalRecords.set(result.dataSize);
                    this.selectedItems.set([]);
                    this.recomputeDisplay();
                    this.loading.set(false);
                },
                error: () => {
                    this.loading.set(false);
                }
            });
    }

    onPage(event: any) {
        this.currentPage = event.page;
        this.currentRows = event.rows;
        this.paginatorFirst = event.first;
        this.loadData();
    }

    /** Public method to trigger a data reload from the host component. */
    refresh() {
        this.loadData();
    }

    // ─── View Dialog ────────────────────────────────────────────────────

    openViewDialog(item: any) {
        this.viewItem = item;
        this.viewDialogVisible = true;
    }

    // ─── Cell Rendering ─────────────────────────────────────────────────

    hasCustomCell(col: ServerColumnConfig): boolean {
        return this.customCellFields().includes(col.field);
    }

    getBooleanLabel(item: any, col: ServerColumnConfig): string {
        return item[col.field]
            ? this.translate.instant(col.booleanTrueLabel || 'common.active')
            : this.translate.instant(col.booleanFalseLabel || 'common.inactive');
    }

    getBooleanSeverity(item: any, col: ServerColumnConfig): string {
        return item[col.field]
            ? (col.booleanTrueSeverity || 'success')
            : (col.booleanFalseSeverity || 'danger');
    }

    getDefaultWidth(col: ServerColumnConfig): string {
        switch (col.type) {
            case 'boolean': return '8rem';
            case 'date': return '10rem';
            case 'entity': return '12rem';
            default: return '10rem';
        }
    }

    // ─── Column Visibility ──────────────────────────────────────────────

    onColumnsChanged() {
        this.cachedVisibleColumnCount.set(this.columns().filter(c => c.visible !== false).length);
    }

    // ─── Global Filter (debounced, client-side on current page) ─────────

    onGlobalFilter(table: Table, event: Event) {
        clearTimeout(this.globalFilterTimeout);
        this.globalFilterTimeout = setTimeout(() => {
            table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        }, 300);
    }

    // ─── Multi-column Grouping ──────────────────────────────────────────

    onGroupFieldsChange(fields: string[]) {
        this.activeGroupFields = fields;

        // Backend grouping: re-fetch with groupBy in criteria
        if (this.groupingConfig().backendGrouping) {
            this.resetPagination();
            this.loadData();
        } else {
            // Frontend grouping: recompute on current page
            this.recomputeDisplay();
        }
    }

    toggleGroup(item: any) {
        const key = item._groupKey;
        if (!key) return;
        this.expandedGroups = { ...this.expandedGroups, [key]: !this.expandedGroups[key] };
        this.displayItems.set(
            this.groupingService.applyGroupVisibility(this.allPageItems, this.expandedGroups)
        );
    }

    isGroupExpanded(key: string): boolean {
        return !this.activeGroupFields.length || this.expandedGroups[key];
    }

    getGroupParts(item: any): { label: string; value: string }[] {
        return this.groupingService.getGroupParts(item, this.activeGroupFields, this.columns(), this.translate);
    }

    // ─── Server-side Filtering ──────────────────────────────────────────

    onFiltersApplied(conditions: FilterCondition[]) {
        this.activeFilters = conditions;
        this.resetPagination();
        this.loadData();
    }

    onFiltersCleared() {
        this.activeFilters = null;
        this.resetPagination();
        this.loadData();
    }

    getFilterChipLabel(condition: FilterCondition): string {
        const col = this.columns().find(c => c.field === condition.field);
        const fieldLabel = col ? this.translate.instant(col.header) : condition.field;
        const opLabel = this.translate.instant(`dataGrid.operators.${condition.operator}`);

        let valueStr: string;
        if (col?.type === 'boolean') {
            valueStr = condition.value
                ? this.translate.instant(col.booleanTrueLabel || 'common.active')
                : this.translate.instant(col.booleanFalseLabel || 'common.inactive');
        } else if (col?.type === 'date' && condition.value) {
            const d = new Date(condition.value);
            valueStr = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
        } else {
            valueStr = String(condition.value ?? '');
        }

        return `${fieldLabel} ${opLabel} ${valueStr}`;
    }

    removeFilter(condition: FilterCondition) {
        if (!this.activeFilters) return;
        const remaining = this.activeFilters.filter(c => c !== condition);
        this.activeFilters = remaining.length ? remaining : null;
        this.resetPagination();
        this.loadData();
        this.toolbar()?.updateFilterState(this.activeFilters);
    }

    clearAllFilters() {
        this.activeFilters = null;
        this.resetPagination();
        this.loadData();
        this.toolbar()?.resetFilterState();
    }

    private resetPagination() {
        this.currentPage = 0;
        this.paginatorFirst = 0;
    }

    // ─── Core Display Pipeline ──────────────────────────────────────────

    private recomputeDisplay() {
        const items = this.items();
        const columns = this.columns();

        // Add flat entity labels for global search
        for (const col of columns) {
            if (col.type === 'entity') {
                const labelKey = `_${col.field}_label`;
                for (const item of items) {
                    (item as any)[labelKey] = item[col.field]?.[col.entityLabelField || 'libelle'] ?? '';
                }
            }
        }

        if (!this.activeGroupFields.length) {
            this.groupCountMap.clear();
            this.allPageItems = items;
            this.displayItems.set(items);
            return;
        }

        // Delegate grouping computation to the service
        const grouped = [...items];
        this.groupCountMap = this.groupingService.computeGroups(
            grouped, this.activeGroupFields, columns, this.translate
        );
        this.expandedGroups = this.groupingService.reconcileExpandedState(
            this.groupCountMap, this.expandedGroups
        );

        this.allPageItems = grouped;
        this.displayItems.set(
            this.groupingService.applyGroupVisibility(grouped, this.expandedGroups)
        );
    }

    // ─── Export ─────────────────────────────────────────────────────────

    private getExportData(source: any[]): Record<string, any>[] {
        const columns = this.columns();
        return source.map(item => {
            const row: Record<string, any> = {};
            for (const col of columns) {
                if (col.visible === false) continue;
                const header = this.translate.instant(col.header);
                const value = item[col.field];
                switch (col.type) {
                    case 'boolean':
                        row[header] = value
                            ? this.translate.instant(col.booleanTrueLabel || 'common.active')
                            : this.translate.instant(col.booleanFalseLabel || 'common.inactive');
                        break;
                    case 'date':
                        if (value) {
                            const d = new Date(value);
                            row[header] = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
                        } else {
                            row[header] = '';
                        }
                        break;
                    case 'entity':
                        row[header] = value?.[col.entityLabelField || 'libelle'] ?? '';
                        break;
                    default:
                        row[header] = value ?? '';
                }
            }
            return row;
        });
    }

    private getExportCriteria(): string[] {
        if (!this.activeFilters?.length) return [];
        return this.activeFilters.map(c => this.getFilterChipLabel(c));
    }

    private doExport(exportFn: (title: string, data: any[], criteria: string[], fileName: string, filterLabel: string) => void) {
        const titleStr = this.translate.instant(this.title());
        const filterLabel = this.translate.instant('dataGrid.export.filtersLabel');
        const criteria = this.getExportCriteria();

        const exportLoader = this.exportDataLoader();
        if (exportLoader) {
            // Fetch all matching records from server for full export
            const serverCriteria = this.criteriaMapper.buildCriteria(
                this.criteriaFactory(),
                this.activeFilters,
                this.columns(),
                0, 0
            );
            // Include groupBy for backend-grouped exports
            if (this.isBackendGrouping) {
                const key = this.groupingConfig().backendGroupCriteriaKey || 'groupBy';
                serverCriteria[key] = [...this.activeGroupFields];
            }
            exportLoader(serverCriteria)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(data => {
                    const rows = this.getExportData(data);
                    if (rows.length) {
                        exportFn(titleStr, rows, criteria, this.exportFileName(), filterLabel);
                    }
                });
        } else {
            // Export current page data
            const source = (this.dt()?.filteredValue ?? this.displayItems()) as any[];
            const rows = this.getExportData(source);
            if (rows.length) {
                exportFn(titleStr, rows, criteria, this.exportFileName(), filterLabel);
            }
        }
    }

    exportToExcel() {
        this.doExport((title, data, criteria, fileName, filterLabel) =>
            this.exportService.exportExcel(title, data, criteria, fileName, filterLabel));
    }

    exportToCsv() {
        this.doExport((title, data, criteria, fileName, filterLabel) =>
            this.exportService.exportCsv(title, data, criteria, fileName, filterLabel));
    }

    exportToPdf() {
        this.doExport((title, data, criteria, fileName, filterLabel) =>
            this.exportService.exportPdf(title, data, criteria, fileName, filterLabel));
    }
}
