import { Injectable } from '@angular/core';
import { FilterCondition, ServerColumnConfig } from '../models/data-grid.models';

/**
 * Translates filter conditions into a backend-compatible criteria object
 * using the `criteriaMapping` defined on each `ServerColumnConfig`.
 *
 * All conditions are AND-ed — each maps to a flat property on the criteria,
 * matching the backend's structured filtering contract. No dynamic query
 * construction (AND/OR logic) is involved.
 *
 * Supports nested paths (e.g., `'commune.libelleLike'`) for entity relationships.
 *
 * Two usage modes:
 * 1. `buildCriteria()` — full criteria with pagination (used by ServerDataTableComponent)
 * 2. `mapFiltersToCriteria()` — filter-only mapping without pagination (standalone use)
 */
@Injectable({ providedIn: 'root' })
export class CriteriaMapperService {

    /**
     * Builds a fresh criteria object populated with filter values and pagination.
     *
     * @param criteriaFactory - Factory function that creates a blank criteria instance
     * @param conditions      - Active filter conditions, or null
     * @param columns         - Column configs with criteriaMapping definitions
     * @param page            - Zero-based page index
     * @param maxResults      - Number of rows per page
     */
    buildCriteria(
        criteriaFactory: () => any,
        conditions: FilterCondition[] | null,
        columns: ServerColumnConfig[],
        page: number,
        maxResults: number
    ): any {
        const criteria = criteriaFactory();
        criteria.page = page;
        criteria.maxResults = maxResults;

        this.applyConditions(criteria, conditions, columns);

        return criteria;
    }

    /**
     * Maps filter conditions onto an existing criteria object without touching pagination.
     *
     * @param criteria   - A pre-created criteria object (e.g., `new BatimentCriteria()`)
     * @param conditions - Active filter conditions, or null
     * @param columns    - Column configs with criteriaMapping definitions
     * @returns The same criteria object with filter values applied
     */
    mapFiltersToCriteria(
        criteria: any,
        conditions: FilterCondition[] | null,
        columns: ServerColumnConfig[]
    ): any {
        this.applyConditions(criteria, conditions, columns);
        return criteria;
    }

    private applyConditions(
        criteria: any,
        conditions: FilterCondition[] | null,
        columns: ServerColumnConfig[]
    ): void {
        if (!conditions?.length) return;

        for (const condition of conditions) {
            this.applyCondition(criteria, condition, columns);
        }
    }

    private applyCondition(
        criteria: any,
        condition: FilterCondition,
        columns: ServerColumnConfig[]
    ): void {
        const col = columns.find(c => c.field === condition.field);
        if (!col?.criteriaMapping) return;

        const criteriaField = col.criteriaMapping[condition.operator];
        if (!criteriaField) return;

        this.setNestedValue(criteria, criteriaField, condition.value);
    }

    private setNestedValue(obj: any, path: string, value: any): void {
        const parts = path.split('.');
        let current = obj;

        for (let i = 0; i < parts.length - 1; i++) {
            if (current[parts[i]] == null) {
                current[parts[i]] = {};
            }
            current = current[parts[i]];
        }

        current[parts[parts.length - 1]] = value;
    }
}
