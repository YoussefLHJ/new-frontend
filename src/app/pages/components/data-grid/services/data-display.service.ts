import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnConfig, FilterCondition } from '../models/data-grid.models';

/**
 * Centralises all "how to display a column value" logic used across
 * DataTableComponent, ServerDataTableComponent, and ViewDetailDialogComponent.
 *
 * Single source of truth for boolean labels/severities, field type icons,
 * column width defaults, filter chip text, and export row formatting.
 */
@Injectable({ providedIn: 'root' })
export class DataDisplayService {
    private readonly translate = inject(TranslateService);

    getBooleanLabel(value: boolean, col: ColumnConfig): string {
        return value
            ? this.translate.instant(col.booleanTrueLabel || 'common.active')
            : this.translate.instant(col.booleanFalseLabel || 'common.inactive');
    }

    getBooleanSeverity(value: boolean, col: ColumnConfig): string {
        return value
            ? (col.booleanTrueSeverity || 'success')
            : (col.booleanFalseSeverity || 'danger');
    }

    getFieldIcon(col: ColumnConfig): string {
        switch (col.type) {
            case 'boolean': return 'pi pi-check-circle';
            case 'date':    return 'pi pi-calendar';
            case 'entity':  return 'pi pi-link';
            case 'numeric': return 'pi pi-hashtag';
            default:        return 'pi pi-align-left';
        }
    }

    getDefaultColumnWidth(col: ColumnConfig): string {
        switch (col.type) {
            case 'boolean': return '8rem';
            case 'date':    return '10rem';
            case 'entity':  return '12rem';
            default:        return '10rem';
        }
    }

    getFilterChipLabel(condition: FilterCondition, columns: ColumnConfig[]): string {
        const col = columns.find(c => c.field === condition.field);
        const fieldLabel = col ? this.translate.instant(col.header) : condition.field;
        const opLabel = this.translate.instant(`dataGrid.operators.${condition.operator}`);

        let valueStr: string;
        if (col?.type === 'boolean') {
            valueStr = this.getBooleanLabel(condition.value, col);
        } else if (col?.type === 'date' && condition.value) {
            const d = new Date(condition.value);
            valueStr = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
        } else {
            valueStr = String(condition.value ?? '');
        }

        return `${fieldLabel} ${opLabel} ${valueStr}`;
    }

    formatExportRow(item: any, columns: ColumnConfig[]): Record<string, any> {
        const row: Record<string, any> = {};
        for (const col of columns) {
            if (col.visible === false) continue;
            const header = this.translate.instant(col.header);
            const value = item[col.field];
            switch (col.type) {
                case 'boolean':
                    row[header] = this.getBooleanLabel(value, col);
                    break;
                case 'date':
                    if (value) {
                        const d = new Date(value);
                        row[header] = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
                    } else {
                        row[header] = '';
                    }
                    break;
                case 'entity':
                    row[header] = value?.[col.entityLabelField || 'libelle'] ?? '';
                    break;
                default:
                    row[header] = value ?? '';
            }
        }
        return row;
    }
}
