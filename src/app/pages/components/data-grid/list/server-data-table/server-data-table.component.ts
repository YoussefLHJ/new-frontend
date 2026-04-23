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
import { SkeletonModule } from 'primeng/skeleton';
import { Popover, PopoverModule } from 'primeng/popover';
import { TranslateService } from '@ngx-translate/core';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';
import { ExportService } from '@/app/zynerator/util/Export.service';
import { DataGridToolbarComponent } from '../data-grid-toolbar/data-grid-toolbar.component';
import { ViewDetailDialogComponent } from '../../view/view-detail-dialog/view-detail-dialog.component';
import {
    ServerColumnConfig, FilterCondition, GroupOption, GroupingConfig,
    DataLoadFn, ExportLoadFn, DataGridServiceContract
} from '../../models/data-grid.models';
import { CriteriaMapperService } from '../../services/criteria-mapper.service';
import { DataGridGroupingService } from '../../services/data-grid-grouping.service';
import { DataDisplayService } from '../../services/data-display.service';

@Component({
    selector: 'app-server-data-table',
    imports: [
        FormsModule, TableModule, ButtonModule, ToolbarModule,
        IconFieldModule, InputIconModule, InputTextModule, TagModule, TooltipModule,
        PaginatorModule, PopoverModule, SkeletonModule,
        NgTemplateOutlet, SignalTranslatePipe, DataGridToolbarComponent, ViewDetailDialogComponent, DatePipe
    ],
    templateUrl: './server-data-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerDataTableComponent implements OnInit {
    // --- Queries ---
    dt = viewChild<Table>('dt');
    toolbar = viewChild(DataGridToolbarComponent);
    rowMenu = viewChild<Popover>('rowMenu');
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
    service = input<DataGridServiceContract | null>(null);

    // --- Outputs ---
    onCreate = output<void>();
    onEdit = output<any>();
    onDelete = output<any>();
    onDeleteSelected = output<any[]>();

    // --- Services ---
    private readonly criteriaMapper = inject(CriteriaMapperService);
    private readonly groupingService = inject(DataGridGroupingService);
    private readonly exportService = inject(ExportService);
    private readonly display = inject(DataDisplayService);
    readonly translate = inject(TranslateService);
    private readonly destroyRef = inject(DestroyRef);

    // --- State ---
    readonly skeletonItems = Array.from({ length: 6 }, () => ({}));
    items = signal<any[]>([]);
    displayItems = signal<any[]>([]);
    totalRecords = signal(0);
    loading = signal(false);
    selectedItems = signal<any[]>([]);
    activeRowItem = signal<any>(null);
    expandedGroups = signal<Record<string, boolean>>({});
    viewDialogVisible = false;
    viewItem: any = null;
    activeGroupFields: string[] = [];
    activeFilters: FilterCondition[] | null = null;
    groupCountMap = new Map<string, number>();
    cachedVisibleColumnCount = signal(0);

    currentPage = 0;
    currentRows = 10;
    paginatorFirst = 0;

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

    refresh() {
        this.loadData();
    }

    // ─── Row Menu ───────────────────────────────────────────────────────

    openRowMenu(event: MouseEvent, item: any) {
        this.activeRowItem.set(item);
        this.rowMenu()?.toggle(event);
    }

    handleDelete(item: any) {
        this.onDelete.emit(item);
    }

    handleDeleteSelected(items: any[]) {
        this.onDeleteSelected.emit(items);
    }

    // ─── View Dialog ────────────────────────────────────────────────────

    openViewDialog(item: any) {
        this.viewItem = item;
        this.viewDialogVisible = true;
    }

    // ─── Cell Rendering (delegates to DataDisplayService) ───────────────

    hasCustomCell(col: ServerColumnConfig): boolean {
        return this.customCellFields().includes(col.field);
    }

    getBooleanLabel(item: any, col: ServerColumnConfig): string {
        return this.display.getBooleanLabel(item[col.field], col);
    }

    getBooleanSeverity(item: any, col: ServerColumnConfig): string {
        return this.display.getBooleanSeverity(item[col.field], col);
    }

    getDefaultWidth(col: ServerColumnConfig): string {
        return this.display.getDefaultColumnWidth(col);
    }

    // ─── Column Visibility ──────────────────────────────────────────────

    onColumnsChanged() {
        const cols = this.columns();
        this.cachedVisibleColumnCount.set(cols.filter(c => c.visible !== false).length);
        // Spread into a new array so PrimeNG's [value] input gets a new reference
        // and re-renders body rows with the updated col.visible state.
        // activeGroupFields is intentionally left untouched: grouping persists
        // independently of whether a grouped column is visible in the row cells.
        this.displayItems.set([...this.displayItems()]);
    }

    // ─── Global Filter ──────────────────────────────────────────────────

    onGlobalFilter(table: Table, event: Event) {
        clearTimeout(this.globalFilterTimeout);
        this.globalFilterTimeout = setTimeout(() => {
            table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        }, 300);
    }

    // ─── Multi-column Grouping ──────────────────────────────────────────

    onGroupFieldsChange(fields: string[]) {
        this.activeGroupFields = fields;

        if (this.groupingConfig().backendGrouping) {
            this.resetPagination();
            this.loadData();
        } else {
            this.recomputeDisplay();
        }
    }

    toggleGroup(item: any) {
        const key = item._groupKey;
        if (!key) return;
        this.expandedGroups.update(g => ({ ...g, [key]: !g[key] }));
    }

    isGroupExpanded(key: string): boolean {
        return !this.activeGroupFields.length || !!this.expandedGroups()[key];
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
        return this.display.getFilterChipLabel(condition, this.columns());
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
            this.displayItems.set(items);
            return;
        }

        const grouped = [...items];
        this.groupCountMap = this.groupingService.computeGroups(
            grouped, this.activeGroupFields, columns, this.translate
        );
        const reconciled = this.groupingService.reconcileExpandedState(
            this.groupCountMap, this.expandedGroups()
        );
        this.expandedGroups.set(reconciled);
        this.displayItems.set(grouped);
    }

    // ─── Export ─────────────────────────────────────────────────────────

    private getExportData(source: any[]): Record<string, any>[] {
        return source.map(item => this.display.formatExportRow(item, this.columns()));
    }

    private getExportCriteria(): string[] {
        if (!this.activeFilters?.length) return [];
        return this.activeFilters.map(c => this.display.getFilterChipLabel(c, this.columns()));
    }

    private doExport(exportFn: (title: string, data: any[], criteria: string[], fileName: string, filterLabel: string) => void) {
        const titleStr = this.translate.instant(this.title());
        const filterLabel = this.translate.instant('dataGrid.export.filtersLabel');
        const criteria = this.getExportCriteria();

        const exportLoader = this.exportDataLoader();
        if (exportLoader) {
            const serverCriteria = this.criteriaMapper.buildCriteria(
                this.criteriaFactory(),
                this.activeFilters,
                this.columns(),
                0, 0
            );
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
        const svc = this.service();
        if (!svc) return;

        const serverCriteria = this.criteriaMapper.buildCriteria(
            this.criteriaFactory(),
            this.activeFilters,
            this.columns(),
            0, 0
        );
        if (this.isBackendGrouping) {
            const key = this.groupingConfig().backendGroupCriteriaKey || 'groupBy';
            serverCriteria[key] = [...this.activeGroupFields];
        }
        svc.exportPdf(serverCriteria)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(buffer => {
                const blob = new Blob([buffer], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${this.exportFileName()}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
            });
    }
}
