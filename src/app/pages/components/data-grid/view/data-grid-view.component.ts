import { Component, ChangeDetectionStrategy, model, input } from '@angular/core';
import { ViewDetailDialogComponent } from './view-detail-dialog/view-detail-dialog.component';
import { ColumnConfig } from '../models/data-grid.models';

/**
 * Entry component for the data-grid view feature.
 *
 * Wraps `ViewDetailDialogComponent` and provides a consistent API surface
 * matching the appareil view-admin pattern.
 *
 * Usage:
 * ```html
 * <app-data-grid-view
 *     [(visible)]="viewDialogVisible"
 *     [item]="selectedItem"
 *     [columns]="columns"
 *     [title]="'entity.header'" />
 * ```
 */
@Component({
    selector: 'app-data-grid-view',
    imports: [ViewDetailDialogComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './data-grid-view.component.html',
})
export class DataGridViewComponent {
    visible = model(false);
    item = input<any>(null);
    columns = input<ColumnConfig[]>([]);
    title = input('');
}
