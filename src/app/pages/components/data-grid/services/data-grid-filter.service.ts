import { Injectable } from '@angular/core';
import { ColumnConfig, FilterCondition } from '../models/data-grid.models';

/**
 * Client-side filtering service for data-grid tables.
 *
 * Applies filter conditions to an in-memory item array.
 * All conditions are AND-ed — an item must match every condition to be included.
 * This mirrors the backend criteria behavior where all set fields narrow the results.
 */
@Injectable({ providedIn: 'root' })
export class DataGridFilterService {

    applyFilters<T>(items: T[], conditions: FilterCondition[] | null, columns: ColumnConfig[]): T[] {
        if (!conditions?.length) {
            return items;
        }
        return items.filter(item =>
            conditions.every(c => this.evaluateCondition(item, c, columns))
        );
    }

    evaluateCondition(item: any, condition: FilterCondition, columns: ColumnConfig[]): boolean {
        const fieldValue = item[condition.field];
        const filterValue = condition.value;

        if (fieldValue === null || fieldValue === undefined) return false;

        const col = columns.find(c => c.field === condition.field);

        if (col?.type === 'boolean') {
            return fieldValue === filterValue;
        }

        if (col?.type === 'date') {
            const itemDate = new Date(fieldValue).getTime();
            const filterDate = new Date(filterValue).getTime();
            switch (condition.operator) {
                case 'equals': return itemDate === filterDate;
                case 'greaterThan': return itemDate > filterDate;
                case 'lessThan': return itemDate < filterDate;
                default: return true;
            }
        }

        if (col?.type === 'numeric') {
            const num = Number(fieldValue);
            const filterNum = Number(filterValue);
            switch (condition.operator) {
                case 'equals': return num === filterNum;
                case 'greaterThan': return num > filterNum;
                case 'lessThan': return num < filterNum;
                default: return true;
            }
        }

        if (col?.type === 'entity') {
            const entityLabel = fieldValue?.[col.entityLabelField || 'libelle'];
            if (!entityLabel) return false;
            const str = String(entityLabel).toLowerCase();
            const search = String(filterValue).toLowerCase();
            switch (condition.operator) {
                case 'equals': return str === search;
                case 'contains': return str.includes(search);
                case 'startsWith': return str.startsWith(search);
                case 'endsWith': return str.endsWith(search);
                default: return true;
            }
        }

        const str = String(fieldValue).toLowerCase();
        const search = String(filterValue).toLowerCase();
        switch (condition.operator) {
            case 'equals': return str === search;
            case 'contains': return str.includes(search);
            case 'startsWith': return str.startsWith(search);
            case 'endsWith': return str.endsWith(search);
            default: return true;
        }
    }
}
