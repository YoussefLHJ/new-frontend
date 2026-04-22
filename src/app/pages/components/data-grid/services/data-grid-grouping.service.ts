import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnConfig, GroupInfo } from '../models/data-grid.models';

@Injectable({ providedIn: 'root' })
export class DataGridGroupingService {

    /**
     * Computes `_groupKey` (display) and `_groupSortKey` (sortable string) on
     * each item, sorts by `_groupSortKey` for correct ordering across all types,
     * and returns a map of display key → count.
     *
     * Mutates items in place.
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
            item._groupSortKey = groupFields
                .map(f => this.getFieldSortValue(item, f, columns))
                .join('\x00');
            item._groupKey = groupFields
                .map(f => this.getFieldDisplayValue(item, f, columns, translate))
                .join(' / ');
        }

        // Sort by the type-aware sort key so numeric/date groups order correctly
        items.sort((a, b) =>
            (a._groupSortKey ?? '').localeCompare(b._groupSortKey ?? '', undefined, { sensitivity: 'base' })
        );

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
     * Returns a string that sorts correctly for any column type.
     * Used as `_groupSortKey` so that numeric and date groups appear in proper order
     * even under PrimeNG's alphabetical sort on the sort field.
     */
    getFieldSortValue(item: any, field: string, columns: ColumnConfig[]): string {
        const col = columns.find(c => c.field === field);
        const value = item[field];
        if (value === null || value === undefined) return '';

        if (col?.type === 'numeric') {
            const num = Number(value);
            if (isNaN(num)) return '';
            // Shift by large offset so negatives stay positive, then zero-pad
            const shifted = num + 1e15;
            return shifted.toFixed(6).padStart(32, '0');
        }
        if (col?.type === 'date') {
            const d = new Date(value);
            if (isNaN(d.getTime())) return '';
            // YYYY-MM-DD: day-level normalization so same-day rows share one group;
            // ISO date format sorts chronologically without extra padding.
            const y = d.getFullYear();
            const mo = (d.getMonth() + 1).toString().padStart(2, '0');
            const dy = d.getDate().toString().padStart(2, '0');
            return `${y}-${mo}-${dy}`;
        }
        if (col?.type === 'boolean') {
            return value ? '1' : '0';
        }
        if (col?.type === 'entity') {
            return (value?.[col.entityLabelField || 'libelle'] ?? '').toLowerCase();
        }
        return String(value).toLowerCase();
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
