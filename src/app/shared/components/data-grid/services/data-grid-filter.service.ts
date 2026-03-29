import { Injectable } from '@angular/core';
import { ColumnConfig, FilterGroup, FilterCondition } from '../models/data-grid.models';

@Injectable({ providedIn: 'root' })
export class DataGridFilterService {

    applyFilters<T>(items: T[], filterGroup: FilterGroup | null, columns: ColumnConfig[]): T[] {
        if (!filterGroup || !filterGroup.conditions.length) {
            return items;
        }
        const { logic, conditions } = filterGroup;
        return items.filter(item => {
            const results = conditions.map(c => this.evaluateCondition(item, c, columns));
            return logic === 'AND' ? results.every(r => r) : results.some(r => r);
        });
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
