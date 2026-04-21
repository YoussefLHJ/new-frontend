import { Component, inject, input, output, computed, effect, untracked, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateService } from '@ngx-translate/core';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';
import { FilterDialogComponent } from '../../shared/filter-dialog/filter-dialog.component';
import { ExportMenuComponent } from '../../shared/export-menu/export-menu.component';
import { ColumnSelectorComponent } from '../../shared/column-selector/column-selector.component';
import { ColumnConfig, FilterCondition, GroupOption, GroupingConfig } from '../../models/data-grid.models';

@Component({
    selector: 'app-data-grid-toolbar',
    imports: [
        FormsModule, ButtonModule, MultiSelectModule, TooltipModule,
        SignalTranslatePipe, FilterDialogComponent, ExportMenuComponent, ColumnSelectorComponent
    ],
    templateUrl: './data-grid-toolbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridToolbarComponent {
    columns = input<ColumnConfig[]>([]);
    groupOptions = input<GroupOption[]>([]);
    groupingConfig = input<GroupingConfig>({});
    storageKey = input('');

    /**
     * Optional factory function for backend filtering mode.
     * When provided, the filter dialog will also emit backend-mapped criteria
     * via (backendCriteriaApplied).
     */
    criteriaFactory = input<(() => any) | null>(null);

    groupChanged = output<string[]>();
    filtersApplied = output<FilterCondition[]>();
    filtersCleared = output<void>();

    /** Emitted when criteriaFactory is provided and filters are applied. */
    backendCriteriaApplied = output<any>();

    exportExcel = output<void>();
    exportCsv = output<void>();
    exportPdf = output<void>();
    columnsChanged = output<ColumnConfig[]>();

    private readonly translate = inject(TranslateService);

    filterDialogVisible = false;
    selectedGroupFields: string[] = [];
    hasActiveFilters = false;
    activeFilterCount = 0;
    private defaultsApplied = false;

    /** Whether the grouping UI should be visible. */
    groupingEnabled = computed(() => {
        const config = this.groupingConfig();
        return config.enabled !== false && this.groupableColumns().length > 0;
    });

    groupableColumns = computed(() => {
        const groupOpts = this.groupOptions();
        const cols = this.columns();
        if (groupOpts?.length) {
            return groupOpts
                .filter(o => o.value !== null)
                .map(o => ({ label: o.label, value: o.value! }));
        }
        return cols
            .filter(c => c.groupable)
            .map(c => ({ label: this.translate.instant(c.header), value: c.field }));
    });

    constructor() {
        // Apply defaultGroupFields from config once groupable columns are known
        effect(() => {
            const config = this.groupingConfig();
            const groupable = this.groupableColumns();
            untracked(() => {
                if (this.defaultsApplied) return;
                const defaults = config.defaultGroupFields;
                if (defaults?.length && groupable.length) {
                    const validFields = groupable.map(g => g.value);
                    this.selectedGroupFields = defaults.filter(f => validFields.includes(f));
                    if (this.selectedGroupFields.length) {
                        this.defaultsApplied = true;
                        this.groupChanged.emit([...this.selectedGroupFields]);
                    }
                }
            });
        });
    }

    onGroupChange() {
        this.groupChanged.emit([...this.selectedGroupFields]);
    }

    clearGrouping() {
        this.selectedGroupFields = [];
        this.groupChanged.emit([]);
    }

    onFiltersApplied(conditions: FilterCondition[]) {
        this.hasActiveFilters = true;
        this.activeFilterCount = conditions.length;
        this.filtersApplied.emit(conditions);
    }

    onFiltersCleared() {
        this.hasActiveFilters = false;
        this.activeFilterCount = 0;
        this.filtersCleared.emit();
    }

    resetFilterState() {
        this.hasActiveFilters = false;
        this.activeFilterCount = 0;
    }

    updateFilterState(conditions: FilterCondition[] | null) {
        if (conditions?.length) {
            this.hasActiveFilters = true;
            this.activeFilterCount = conditions.length;
        } else {
            this.hasActiveFilters = false;
            this.activeFilterCount = 0;
        }
    }
}
