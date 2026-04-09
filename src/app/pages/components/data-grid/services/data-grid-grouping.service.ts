import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnConfig, GroupInfo } from '../models/data-grid.models';

/**
 * Stateless service that computes grouping for data-grid tables.
 *
 * Handles:
 * - Composite group key computation from one or more fields
 * - Sorting items by group key for PrimeNG subheader mode
 * - Group count aggregation
 * - Expand/collapse state management
 * - Display value resolution (entity labels, booleans, dates, etc.)
 *
 * Both DataTableComponent and ServerDataTableComponent delegate to this
 * service so grouping logic lives in one place.
 */
@Injectable({ providedIn: 'root' })
export class DataGridGroupingService {

    /**
     * Computes `_groupKey` on each item, sorts by that key,
     * and returns a map of group key → count.
     *
     * Mutates items in place (adds `_groupKey` property).
     */
    computeGroups(
        items: any[],
        groupFields: string[],
        columns: ColumnConfig[],
        translate: TranslateService
    ): Map<string, number> {
        const countMap = new Map<string, number>();
        if (!groupFields.length) return countMap;

        for (const item of items) {
            item._groupKey = groupFields
                .map(f => this.getFieldDisplayValue(item, f, columns, translate))
                .join(' / ');
        }

        items.sort((a, b) => (a._groupKey ?? '').localeCompare(b._groupKey ?? ''));

        for (const item of items) {
            const key = item._groupKey;
            countMap.set(key, (countMap.get(key) ?? 0) + 1);
        }

        return countMap;
    }

    /**
     * Merges newly computed group keys into existing expand/collapse state.
     * New groups default to expanded; existing groups preserve their state.
     */
    reconcileExpandedState(
        countMap: Map<string, number>,
        existing: Record<string, boolean>
    ): Record<string, boolean> {
        const result: Record<string, boolean> = {};
        for (const key of countMap.keys()) {
            result[key] = key in existing ? existing[key] : true;
        }
        return result;
    }

    /**
     * Filters the full item list down to what should be rendered,
     * hiding items in collapsed groups (keeping one representative row).
     */
    applyGroupVisibility(
        items: any[],
        expanded: Record<string, boolean>
    ): any[] {
        const result: any[] = [];
        const seenCollapsed = new Set<string>();

        for (const item of items) {
            const key = item._groupKey;
            if (expanded[key]) {
                result.push(item);
            } else if (!seenCollapsed.has(key)) {
                seenCollapsed.add(key);
                result.push(item);
            }
        }

        return result;
    }

    /**
     * Returns label/value pairs for a group header row.
     */
    getGroupParts(
        item: any,
        groupFields: string[],
        columns: ColumnConfig[],
        translate: TranslateService
    ): { label: string; value: string }[] {
        return groupFields.map(field => {
            const col = columns.find(c => c.field === field);
            return {
                label: col ? translate.instant(col.header) : field,
                value: this.getFieldDisplayValue(item, field, columns, translate)
            };
        });
    }

    /**
     * Resolves a field value to its display string,
     * handling entity labels, booleans, dates, and plain values.
     */
    getFieldDisplayValue(
        item: any,
        field: string,
        columns: ColumnConfig[],
        translate: TranslateService
    ): string {
        const col = columns.find(c => c.field === field);
        const value = item[field];
        if (value === null || value === undefined) return '—';

        if (col?.type === 'boolean') {
            return value
                ? translate.instant(col.booleanTrueLabel || 'common.active')
                : translate.instant(col.booleanFalseLabel || 'common.inactive');
        }
        if (col?.type === 'entity') {
            return value?.[col.entityLabelField || 'libelle'] ?? '—';
        }
        if (col?.type === 'date') {
            const d = new Date(value);
            return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
        }
        return String(value);
    }
}
