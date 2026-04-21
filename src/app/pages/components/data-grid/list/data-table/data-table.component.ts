import {
    Component, ChangeDetectionStrategy, TemplateRef, computed, contentChild, effect,
    inject, input, output, signal, untracked, viewChild, DestroyRef
} from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Menu, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';
import { ExportService } from '@/app/zynerator/util/Export.service';
import { DataGridToolbarComponent } from '../data-grid-toolbar/data-grid-toolbar.component';
import { ViewDetailDialogComponent } from '../../view/view-detail-dialog/view-detail-dialog.component';
import { ColumnConfig, FilterCondition, GroupOption, GroupingConfig } from '../../models/data-grid.models';
import { DataGridFilterService } from '../../services/data-grid-filter.service';
import { DataGridGroupingService } from '../../services/data-grid-grouping.service';
import { DataDisplayService } from '../../services/data-display.service';

@Component({
    selector: 'app-data-table',
    imports: [
        FormsModule, TableModule, ButtonModule, ToolbarModule,
        IconFieldModule, InputIconModule, InputTextModule, TagModule, TooltipModule,
        MenuModule, NgTemplateOutlet, SignalTranslatePipe, DataGridToolbarComponent,
        ViewDetailDialogComponent, DatePipe
    ],
    templateUrl: './data-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
    // --- Queries ---
    dt = viewChild<Table>('dt');
    toolbar = viewChild(DataGridToolbarComponent);
    rowMenu = viewChild<Menu>('rowMenu');
    customCellTpl = contentChild<TemplateRef<any>>('customCell');

    // --- Inputs ---
    items = input<any[]>([]);
    columns = input<ColumnConfig[]>([]);
    title = input('');
    storageKey = input('');
    groupOptions = input<GroupOption[]>([]);
    groupingConfig = input<GroupingConfig>({});
    globalFilterFields = input<string[]>([]);
    dataKey = input('id');
    exportFileName = input('export');
    tableMinWidth = input('60rem');
    loading = input(false);
    emptyMessage = input('common.noData');
    customCellFields = input<string[]>([]);

    // --- Outputs ---
    onCreate = output<void>();
    onEdit = output<any>();
    onDelete = output<any>();
    onDeleteSelected = output<any[]>();

    // --- Services ---
    private readonly filterService = inject(DataGridFilterService);
    private readonly groupingService = inject(DataGridGroupingService);
    private readonly exportService = inject(ExportService);
    private readonly display = inject(DataDisplayService);
    readonly translate = inject(TranslateService);
    private readonly destroyRef = inject(DestroyRef);

    // --- State ---
    displayItems = signal<any[]>([]);
    selectedItems = signal<any[]>([]);
    rowMenuItems = signal<MenuItem[]>([]);
    viewDialogVisible = false;
    viewItem: any = null;
    activeGroupFields: string[] = [];
    activeFilters: FilterCondition[] | null = null;
    expandedGroups: { [key: string]: boolean } = {};
    groupCountMap = new Map<string, number>();
    cachedVisibleColumnCount = signal(0);

    private allFilteredItems: any[] = [];
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

        effect(() => {
            this.items();
            untracked(() => {
                this.selectedItems.set([]);
                this.recomputeDisplay();
            });
        });

        this.destroyRef.onDestroy(() => clearTimeout(this.globalFilterTimeout));
    }

    // --- Row menu ---

    openRowMenu(event: MouseEvent, item: any) {
        this.rowMenuItems.set([
            { label: this.translate.instant('common.view'), icon: 'pi pi-eye', command: () => this.openViewDialog(item) },
            { label: this.translate.instant('common.edit'), icon: 'pi pi-pencil', command: () => this.onEdit.emit(item) },
            { separator: true },
            { label: this.translate.instant('common.delete'), icon: 'pi pi-trash', styleClass: 'text-red-500', command: () => this.onDelete.emit(item) },
        ]);
        this.rowMenu()?.toggle(event);
    }

    // --- View dialog ---

    openViewDialog(item: any) {
        this.viewItem = item;
        this.viewDialogVisible = true;
    }

    // --- Cell rendering (delegates to DataDisplayService) ---

    hasCustomCell(col: ColumnConfig): boolean {
        return this.customCellFields().includes(col.field);
    }

    getBooleanLabel(item: any, col: ColumnConfig): string {
        return this.display.getBooleanLabel(item[col.field], col);
    }

    getBooleanSeverity(item: any, col: ColumnConfig): string {
        return this.display.getBooleanSeverity(item[col.field], col);
    }

    getDefaultWidth(col: ColumnConfig): string {
        return this.display.getDefaultColumnWidth(col);
    }

    // --- Column Visibility ---

    onColumnsChanged() {
        this.cachedVisibleColumnCount.set(this.columns().filter(c => c.visible !== false).length);
    }

    // --- Global Filter (debounced) ---

    onGlobalFilter(table: Table, event: Event) {
        clearTimeout(this.globalFilterTimeout);
        this.globalFilterTimeout = setTimeout(() => {
            table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        }, 300);
    }

    // --- Multi-column Grouping ---

    onGroupFieldsChange(fields: string[]) {
        this.activeGroupFields = fields;
        this.recomputeDisplay();
    }

    toggleGroup(item: any) {
        const key = item._groupKey;
        if (!key) return;
        this.expandedGroups = { ...this.expandedGroups, [key]: !this.expandedGroups[key] };
        this.displayItems.set(
            this.groupingService.applyGroupVisibility(this.allFilteredItems, this.expandedGroups)
        );
    }

    isGroupExpanded(key: string): boolean {
        return !this.activeGroupFields.length || this.expandedGroups[key];
    }

    getGroupParts(item: any): { label: string; value: string }[] {
        return this.groupingService.getGroupParts(item, this.activeGroupFields, this.columns(), this.translate);
    }

    // --- Advanced Filtering ---

    onFiltersApplied(conditions: FilterCondition[]) {
        this.activeFilters = conditions;
        this.recomputeDisplay();
    }

    onFiltersCleared() {
        this.activeFilters = null;
        this.recomputeDisplay();
    }

    getFilterChipLabel(condition: FilterCondition): string {
        return this.display.getFilterChipLabel(condition, this.columns());
    }

    removeFilter(condition: FilterCondition) {
        if (!this.activeFilters) return;
        const remaining = this.activeFilters.filter(c => c !== condition);
        this.activeFilters = remaining.length ? remaining : null;
        this.recomputeDisplay();
        this.toolbar()?.updateFilterState(this.activeFilters);
    }

    clearAllFilters() {
        this.activeFilters = null;
        this.recomputeDisplay();
        this.toolbar()?.resetFilterState();
    }

    // --- Core data pipeline ---

    private recomputeDisplay() {
        const items = this.items();
        const columns = this.columns();
        const filtered = this.filterService.applyFilters(items, this.activeFilters, columns);

        for (const col of columns) {
            if (col.type === 'entity') {
                const labelKey = `_${col.field}_label`;
                for (const item of filtered) {
                    (item as any)[labelKey] = item[col.field]?.[col.entityLabelField || 'libelle'] ?? '';
                }
            }
        }

        if (!this.activeGroupFields.length) {
            this.groupCountMap.clear();
            this.allFilteredItems = filtered;
            this.displayItems.set(filtered);
            return;
        }

        this.groupCountMap = this.groupingService.computeGroups(
            filtered, this.activeGroupFields, columns, this.translate
        );
        this.expandedGroups = this.groupingService.reconcileExpandedState(
            this.groupCountMap, this.expandedGroups
        );

        this.allFilteredItems = filtered;
        this.displayItems.set(
            this.groupingService.applyGroupVisibility(filtered, this.expandedGroups)
        );
    }

    // --- Export ---

    private getExportData(): any[] {
        const source = (this.dt()?.filteredValue ?? this.displayItems()) as any[];
        return source.map(item => this.display.formatExportRow(item, this.columns()));
    }

    private getExportCriteria(): string[] {
        if (!this.activeFilters?.length) return [];
        return this.activeFilters.map(c => this.display.getFilterChipLabel(c, this.columns()));
    }

    exportToExcel() {
        const data = this.getExportData();
        if (!data.length) return;
        const titleStr = this.translate.instant(this.title());
        const filterLabel = this.translate.instant('dataGrid.export.filtersLabel');
        this.exportService.exportExcel(titleStr, data, this.getExportCriteria(), this.exportFileName(), filterLabel);
    }

    exportToCsv() {
        const data = this.getExportData();
        if (!data.length) return;
        const titleStr = this.translate.instant(this.title());
        const filterLabel = this.translate.instant('dataGrid.export.filtersLabel');
        this.exportService.exportCsv(titleStr, data, this.getExportCriteria(), this.exportFileName(), filterLabel);
    }

    exportToPdf() {
        const data = this.getExportData();
        if (!data.length) return;
        const titleStr = this.translate.instant(this.title());
        const filterLabel = this.translate.instant('dataGrid.export.filtersLabel');
        this.exportService.exportPdf(titleStr, data, this.getExportCriteria(), this.exportFileName(), filterLabel);
    }
}
