import { Component, inject, input, output, model, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateService } from '@ngx-translate/core';
import { SignalTranslatePipe } from 'src/app/shared/pipe/signal-translate.pipe';
import {
    ColumnConfig, ServerColumnConfig, FilterCondition, FilterGroup, FilterOperator,
    TEXT_OPERATORS, NUMERIC_OPERATORS, BOOLEAN_OPERATORS, DATE_OPERATORS
} from '../models/data-grid.models';
import { CriteriaMapperService } from '../services/criteria-mapper.service';

interface FilterRow {
    field: string;
    operator: FilterOperator;
    value: any;
}

/**
 * Reusable advanced filter dialog supporting both client-side and backend-driven filtering.
 *
 * **Client-side mode** (default):
 *   Provide [columns] and listen to (filtersApplied) for a FilterGroup.
 *
 * **Backend mode** (opt-in):
 *   Additionally provide [criteriaFactory]. When applied, (backendCriteriaApplied)
 *   emits a backend-ready criteria object with filter values mapped via
 *   ServerColumnConfig.criteriaMapping.
 *
 * ```html
 * <!-- Client-side only -->
 * <app-filter-dialog [columns]="cols" (filtersApplied)="onFilter($event)" />
 *
 * <!-- Backend mode -->
 * <app-filter-dialog [columns]="serverCols" [criteriaFactory]="createCriteria"
 *                    (filtersApplied)="onFilter($event)"
 *                    (backendCriteriaApplied)="onBackendFilter($event)" />
 * ```
 */
@Component({
    selector: 'app-filter-dialog',
    imports: [
        FormsModule, ButtonModule, DialogModule, SelectModule,
        InputTextModule, DatePickerModule, ToggleSwitchModule,
        TooltipModule, SignalTranslatePipe
    ],
    templateUrl: './filter-dialog.component.html',
    styleUrl: './filter-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDialogComponent implements OnInit {
    columns = input<ColumnConfig[]>([]);
    visible = model(false);

    /**
     * Optional factory function to create a blank criteria instance.
     * When provided, enables backend mode: (backendCriteriaApplied) will emit
     * a criteria object with filter values mapped via criteriaMapping.
     */
    criteriaFactory = input<(() => any) | null>(null);

    /** Always emitted with the raw FilterGroup (unchanged from original behavior). */
    filtersApplied = output<FilterGroup>();
    filtersCleared = output<void>();

    /**
     * Emitted only when criteriaFactory is provided.
     * Contains a backend-ready criteria object with filter values mapped
     * using ServerColumnConfig.criteriaMapping.
     */
    backendCriteriaApplied = output<any>();

    private readonly translate = inject(TranslateService);
    private readonly criteriaMapper = inject(CriteriaMapperService);

    filterRows: FilterRow[] = [];
    logic: 'AND' | 'OR' = 'AND';

    private closedViaApply = false;

    get fieldOptions() {
        return this.columns().map(c => ({
            label: this.translate.instant(c.header),
            value: c.field
        }));
    }

    get validConditionCount(): number {
        return this.filterRows.filter(r =>
            r.field && r.operator && (r.value !== '' && r.value !== null && r.value !== undefined)
        ).length;
    }

    get applyLabel(): string {
        return this.translate.instant('dataGrid.filter.apply');
    }

    ngOnInit() {
        if (!this.filterRows.length) {
            this.addRow();
        }
    }

    getFieldType(field: string): string {
        const col = this.columns().find(c => c.field === field);
        if (col?.type === 'entity') return 'text';
        return col?.type ?? 'text';
    }

    getOperatorsForField(field: string): any[] {
        const type = this.getFieldType(field);
        let operators: { label: string; value: FilterOperator }[];
        switch (type) {
            case 'numeric': operators = NUMERIC_OPERATORS; break;
            case 'boolean': operators = BOOLEAN_OPERATORS; break;
            case 'date': operators = DATE_OPERATORS; break;
            default: operators = TEXT_OPERATORS; break;
        }
        return operators.map(o => ({
            ...o,
            translatedLabel: this.translate.instant(o.label)
        }));
    }

    getBooleanLabel(row: FilterRow, state: boolean): string {
        const col = this.columns().find(c => c.field === row.field);
        if (state) {
            return this.translate.instant(col?.booleanTrueLabel || 'common.active');
        }
        return this.translate.instant(col?.booleanFalseLabel || 'common.inactive');
    }

    onFieldChange(row: FilterRow) {
        const type = this.getFieldType(row.field);
        row.value = type === 'boolean' ? false : type === 'date' ? null : '';
        const ops = this.getOperatorsForField(row.field);
        row.operator = ops.length ? ops[0].value : 'contains';
    }

    addRow() {
        const defaultField = this.fieldOptions.length ? this.fieldOptions[0].value : '';
        this.filterRows.push({
            field: defaultField,
            operator: 'contains',
            value: ''
        });
    }

    removeRow(index: number) {
        this.filterRows.splice(index, 1);
        if (!this.filterRows.length) {
            this.addRow();
        }
    }

    applyFilters() {
        const validConditions: FilterCondition[] = this.filterRows
            .filter(r => r.field && r.operator && (r.value !== '' && r.value !== null && r.value !== undefined))
            .map(r => ({ field: r.field, operator: r.operator, value: r.value }));

        if (!validConditions.length) {
            this.clearAll();
            return;
        }

        const filterGroup: FilterGroup = {
            logic: this.logic,
            conditions: validConditions
        };

        // Always emit the raw FilterGroup (backward-compatible)
        this.filtersApplied.emit(filterGroup);

        // When criteriaFactory is provided, also emit backend-mapped criteria
        const factory = this.criteriaFactory();
        if (factory) {
            const criteria = factory();
            this.criteriaMapper.mapFiltersToCriteria(
                criteria,
                filterGroup,
                this.columns() as ServerColumnConfig[]
            );
            this.backendCriteriaApplied.emit(criteria);
        }

        this.closedViaApply = true;
        this.visible.set(false);
    }

    clearAll() {
        this.filterRows = [];
        this.addRow();
        this.logic = 'AND';
        this.filtersCleared.emit();
    }

    close() {
        this.visible.set(false);
    }

    onDialogHide() {
        if (this.closedViaApply) {
            this.closedViaApply = false;
        } else {
            this.filterRows = [];
            this.addRow();
            this.logic = 'AND';
            this.filtersCleared.emit();
        }
    }
}
