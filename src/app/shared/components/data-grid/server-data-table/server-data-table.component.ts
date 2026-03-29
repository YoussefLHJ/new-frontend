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
import { SignalTranslatePipe } from 'src/app/shared/pipe/signal-translate.pipe';
import { ExportService } from 'src/app/zynerator/util/Export.service';
import { DataGridToolbarComponent } from '../data-grid-toolbar/data-grid-toolbar.component';
import { ViewDetailDialogComponent } from '../view-detail-dialog/view-detail-dialog.component';
import {
    ServerColumnConfig, FilterCondition, FilterGroup, GroupOption,
    DataLoadFn, ExportLoadFn
} from '../models/data-grid.models';
import { CriteriaMapperService } from '../services/criteria-mapper.service';

/**
 * Server-side data table component with backend-driven filtering and pagination.
 *
 * Uses the same UI/UX patterns as DataTableComponent but delegates filtering
 * and pagination to the backend via CriteriaMapperService.
 *
 * Usage:
 * ```html
 * <app-server-data-table
 *     [columns]="columns"
 *     [dataLoader]="loadData"
 *     [criteriaFactory]="createCriteria"
 *     [title]="'lotReleve.header'"
 *     [storageKey]="'lot-releve'"
 *     (onCreate)="openCreate()"
 *     (onEdit)="edit($event)"
 *     (onDelete)="delete($event)"
 *     (onDeleteSelected)="deleteMultiple($event)" />
 * ```
 *
 * Where in the host component:
 * ```ts
 * columns: ServerColumnConfig[] = [
 *     { field: 'numero', header: 'lotReleve.numero', type: 'text', sortable: true,
 *       criteriaMapping: { contains: 'numeroLike', equals: 'numero' } },
 *     ...
 * ];
 * loadData = (criteria: LotReleveCriteria) => this.service.findPaginatedByCriteria(criteria);
 * createCriteria = () => new LotReleveCriteria();
 * ```
 *
 * IMPORTANT: Define dataLoader/criteriaFactory/exportDataLoader as arrow-function
 * class properties (not methods) to avoid creating new references each CD cycle.
 */
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
    private readonly exportService = inject(ExportService);
    readonly translate = inject(TranslateService);
    private readonly destroyRef = inject(DestroyRef);

    // --- State ---
    items = signal<any[]>([]);
    displayItems = signal<any[]>([]);
    totalRecords = signal(0);
    loading = signal(false);
    selectedItems: any[] = [];
    viewDialogVisible = false;
    viewItem: any = null;
    activeGroupFields: string[] = [];
    activeFilterGroup: FilterGroup | null = null;
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
            this.activeFilterGroup,
            this.columns(),
            this.currentPage,
            this.currentRows
        );

        this.dataLoader()(criteria)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: result => {
                    this.items.set(result.list);
                    this.totalRecords.set(result.dataSize);
                    this.selectedItems = [];
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

    // ─── Multi-column Grouping (client-side on current page) ────────────

    onGroupFieldsChange(fields: string[]) {
        this.activeGroupFields = fields;
        this.recomputeDisplay();
    }

    toggleGroup(item: any) {
        const key = item._groupKey;
        if (!key) return;
        this.expandedGroups = { ...this.expandedGroups, [key]: !this.expandedGroups[key] };
        this.applyGroupVisibility();
    }

    isGroupExpanded(key: string): boolean {
        return !this.activeGroupFields.length || this.expandedGroups[key];
    }

    getGroupParts(item: any): { label: string; value: string }[] {
        return this.activeGroupFields.map(field => {
            const col = this.columns().find(c => c.field === field);
            return {
                label: col ? this.translate.instant(col.header) : field,
                value: this.getFieldDisplayValue(item, field)
            };
        });
    }

    private getFieldDisplayValue(item: any, field: string): string {
        const col = this.columns().find(c => c.field === field);
        const value = item[field];
        if (value === null || value === undefined) return '—';

        if (col?.type === 'boolean') {
            return value
                ? this.translate.instant(col.booleanTrueLabel || 'common.active')
                : this.translate.instant(col.booleanFalseLabel || 'common.inactive');
        }
        if (col?.type === 'entity') {
            return value?.[col.entityLabelField || 'libelle'] ?? '—';
        }
        if (col?.type === 'date') {
            const d = new Date(value);
            return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
        }
        return String(value);
    }

    // ─── Server-side Filtering ──────────────────────────────────────────

    onFiltersApplied(filterGroup: FilterGroup) {
        this.activeFilterGroup = filterGroup;
        this.resetPagination();
        this.loadData();
    }

    onFiltersCleared() {
        this.activeFilterGroup = null;
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
        if (!this.activeFilterGroup) return;
        const remaining = this.activeFilterGroup.conditions.filter(c => c !== condition);
        if (remaining.length) {
            this.activeFilterGroup = { ...this.activeFilterGroup, conditions: remaining };
        } else {
            this.activeFilterGroup = null;
        }
        this.resetPagination();
        this.loadData();
        this.toolbar()?.updateFilterState(this.activeFilterGroup);
    }

    clearAllFilters() {
        this.activeFilterGroup = null;
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

        // Compute composite group key
        const grouped = [...items];
        for (const item of grouped) {
            (item as any)._groupKey = this.activeGroupFields
                .map(f => this.getFieldDisplayValue(item, f))
                .join(' / ');
        }

        // Sort by group key for PrimeNG subheader mode
        grouped.sort((a, b) => ((a as any)._groupKey ?? '').localeCompare((b as any)._groupKey ?? ''));

        // Pre-compute group counts
        this.groupCountMap.clear();
        for (const item of grouped) {
            const key = (item as any)._groupKey;
            this.groupCountMap.set(key, (this.groupCountMap.get(key) ?? 0) + 1);
        }

        // Initialize new groups as expanded, preserve existing collapse state
        const newExpanded: { [key: string]: boolean } = {};
        for (const key of this.groupCountMap.keys()) {
            newExpanded[key] = key in this.expandedGroups ? this.expandedGroups[key] : true;
        }
        this.expandedGroups = newExpanded;

        this.allPageItems = grouped;
        this.applyGroupVisibility();
    }

    private applyGroupVisibility() {
        if (!this.activeGroupFields.length) {
            this.displayItems.set(this.allPageItems);
            return;
        }

        const result: any[] = [];
        const seenCollapsedGroups = new Set<string>();

        for (const item of this.allPageItems) {
            const key = (item as any)._groupKey;
            if (this.expandedGroups[key]) {
                result.push(item);
            } else if (!seenCollapsedGroups.has(key)) {
                seenCollapsedGroups.add(key);
                result.push(item);
            }
        }

        this.displayItems.set(result);
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
        if (!this.activeFilterGroup?.conditions.length) return [];
        return this.activeFilterGroup.conditions.map(c => this.getFilterChipLabel(c));
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
                this.activeFilterGroup,
                this.columns(),
                0, 0
            );
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
