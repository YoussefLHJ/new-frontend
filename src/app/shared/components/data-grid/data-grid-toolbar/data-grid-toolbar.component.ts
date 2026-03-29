import { Component, inject, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateService } from '@ngx-translate/core';
import { SignalTranslatePipe } from 'src/app/shared/pipe/signal-translate.pipe';
import { FilterDialogComponent } from '@/app/shared/components/data-grid';
import { ExportMenuComponent } from '@/app/shared/components/data-grid';
import { ColumnSelectorComponent } from '@/app/shared/components/data-grid';
import { ColumnConfig, FilterGroup, GroupOption } from '../models/data-grid.models';

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
    storageKey = input('');

    /**
     * Optional factory function for backend filtering mode.
     * When provided, the filter dialog will also emit backend-mapped criteria
     * via (backendCriteriaApplied).
     */
    criteriaFactory = input<(() => any) | null>(null);

    groupChanged = output<string[]>();
    filtersApplied = output<FilterGroup>();
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

    onGroupChange() {
        this.groupChanged.emit([...this.selectedGroupFields]);
    }

    onFiltersApplied(filterGroup: FilterGroup) {
        this.hasActiveFilters = true;
        this.activeFilterCount = filterGroup.conditions.length;
        this.filtersApplied.emit(filterGroup);
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

    updateFilterState(group: FilterGroup | null) {
        if (group && group.conditions.length) {
            this.hasActiveFilters = true;
            this.activeFilterCount = group.conditions.length;
        } else {
            this.hasActiveFilters = false;
            this.activeFilterCount = 0;
        }
    }
}
