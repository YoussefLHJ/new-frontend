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

/**
 * A single, typed filter condition that maps to a specific criteria field.
 *
 * The `field` and `operator` combination determines which criteria property
 * gets set via `ServerColumnConfig.criteriaMapping`. All conditions are
 * combined with AND logic — the backend criteria model is the contract.
 */
export interface FilterCondition {
    field: string;
    operator: FilterOperator;
    value: any;
}

export type FilterOperator = 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';

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

// ── Grouping ───────────────────────────────────────────────────────────

/**
 * Configuration for data grouping behavior.
 *
 * Grouping can work in two modes:
 * - **Frontend grouping** (default): groups the already-loaded data in memory.
 *   Works with both client and server tables; in server mode it groups the
 *   current page of results.
 * - **Backend grouping**: passes `groupBy` field names to the criteria object
 *   so the API can return pre-grouped/sorted data. Enable via `backendGrouping: true`.
 *
 * Usage:
 * ```ts
 * groupingConfig: GroupingConfig = {
 *     enabled: true,
 *     defaultGroupFields: ['batiment'],
 *     backendGrouping: false,          // optional, defaults to false
 *     backendGroupCriteriaKey: 'groupBy' // optional, defaults to 'groupBy'
 * };
 * ```
 */
export interface GroupingConfig {
    /** Master switch — when false, no grouping UI is shown. Defaults to true. */
    enabled?: boolean;
    /** Column fields to group by on initial load. */
    defaultGroupFields?: string[];
    /**
     * When true (server mode only), the active group fields are sent to the
     * backend via the criteria object instead of grouping client-side.
     * Falls back to frontend grouping if the table is in client mode.
     */
    backendGrouping?: boolean;
    /**
     * The criteria property name for backend grouping.
     * Defaults to `'groupBy'`. The value set will be `string[]`.
     */
    backendGroupCriteriaKey?: string;
}

/** Internal representation of a group computed by the grouping service. */
export interface GroupInfo {
    key: string;
    parts: { label: string; value: string }[];
    count: number;
}

/**
 * Configuration for the data-grid-list entry component.
 * Provides a single config object that can be shared across entities
 * instead of passing many individual inputs.
 */
export interface DataGridListConfig {
    columns: ColumnConfig[] | ServerColumnConfig[];
    title: string;
    mode?: 'client' | 'server';
    storageKey?: string;
    dataKey?: string;
    exportFileName?: string;
    tableMinWidth?: string;
    emptyMessage?: string;
    groupOptions?: GroupOption[];
    groupingConfig?: GroupingConfig;
    globalFilterFields?: string[];
    customCellFields?: string[];
    initialRows?: number;
    /** Server-mode only: factory function to create blank criteria instances. */
    criteriaFactory?: () => any;
    /** Server-mode only: loads a paginated page of data. */
    dataLoader?: DataLoadFn;
    /** Server-mode only: loads all matching records for export. */
    exportDataLoader?: ExportLoadFn;
}
