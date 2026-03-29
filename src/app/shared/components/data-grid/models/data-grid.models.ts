import { Observable } from 'rxjs';

export interface ColumnConfig {
    field: string;
    header: string;
    type: 'text' | 'numeric' | 'boolean' | 'date' | 'entity';
    sortable?: boolean;
    visible?: boolean;
    groupable?: boolean;
    entityLabelField?: string;
    width?: string;
    filterField?: string;
    booleanTrueLabel?: string;
    booleanFalseLabel?: string;
    booleanTrueSeverity?: string;
    booleanFalseSeverity?: string;
    dateFormat?: string;
}

/**
 * Extended column config for server-side data tables.
 * Maps filter operators to backend criteria field names.
 *
 * Example:
 * ```ts
 * { field: 'numero', type: 'text', criteriaMapping: { contains: 'numeroLike', equals: 'numero' } }
 * { field: 'nbBatiments', type: 'numeric', criteriaMapping: { greaterThan: 'nbBatimentsMin', lessThan: 'nbBatimentsMax' } }
 * { field: 'dateCreation', type: 'date', criteriaMapping: { greaterThan: 'dateCreationFrom', lessThan: 'dateCreationTo' } }
 * { field: 'uniteReleve', type: 'entity', criteriaMapping: { contains: 'uniteReleve.libelleLike' } }
 * ```
 */
export interface ServerColumnConfig extends ColumnConfig {
    criteriaMapping?: Partial<Record<FilterOperator, string>>;
}

/** Loads a paginated list from the backend given a criteria object. */
export type DataLoadFn = (criteria: any) => Observable<{ list: any[]; dataSize: number }>;

/** Loads all matching records (unpaginated) for export. */
export type ExportLoadFn = (criteria: any) => Observable<any[]>;

export interface FilterCondition {
    field: string;
    operator: FilterOperator;
    value: any;
}

export type FilterOperator = 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';

export interface FilterGroup {
    logic: 'AND' | 'OR';
    conditions: FilterCondition[];
}

export interface GroupOption {
    label: string;
    value: string | null;
}

export const TEXT_OPERATORS: { label: string; value: FilterOperator }[] = [
    { label: 'dataGrid.operators.contains', value: 'contains' },
    { label: 'dataGrid.operators.equals', value: 'equals' },
    { label: 'dataGrid.operators.startsWith', value: 'startsWith' },
    { label: 'dataGrid.operators.endsWith', value: 'endsWith' }
];

export const NUMERIC_OPERATORS: { label: string; value: FilterOperator }[] = [
    { label: 'dataGrid.operators.equals', value: 'equals' },
    { label: 'dataGrid.operators.greaterThan', value: 'greaterThan' },
    { label: 'dataGrid.operators.lessThan', value: 'lessThan' }
];

export const BOOLEAN_OPERATORS: { label: string; value: FilterOperator }[] = [
    { label: 'dataGrid.operators.equals', value: 'equals' }
];

export const DATE_OPERATORS: { label: string; value: FilterOperator }[] = [
    { label: 'dataGrid.operators.equals', value: 'equals' },
    { label: 'dataGrid.operators.greaterThan', value: 'greaterThan' },
    { label: 'dataGrid.operators.lessThan', value: 'lessThan' }
];
