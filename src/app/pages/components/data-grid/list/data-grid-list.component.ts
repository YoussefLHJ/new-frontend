import {
    Component, ChangeDetectionStrategy, TemplateRef, contentChild, input, output, viewChild
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { ServerDataTableComponent } from './server-data-table/server-data-table.component';
import {
    ColumnConfig, ServerColumnConfig, GroupOption, GroupingConfig,
    DataLoadFn, ExportLoadFn
} from '../models/data-grid.models';

/**
 * Unified entry component for the data-grid list feature.
 *
 * Wraps either `DataTableComponent` (client-side) or `ServerDataTableComponent`
 * (server-side) based on the `mode` input. Provides a single API surface that
 * mirrors the appareil list-admin pattern.
 *
 * Usage (client-side):
 * ```html
 * <app-data-grid-list
 *     mode="client"
 *     [items]="myItems"
 *     [columns]="myColumns"
 *     [title]="'entity.header'"
 *     (onCreate)="openCreate()"
 *     (onEdit)="edit($event)"
 *     (onDelete)="delete($event)" />
 * ```
 *
 * Usage (server-side):
 * ```html
 * <app-data-grid-list
 *     mode="server"
 *     [columns]="serverColumns"
 *     [dataLoader]="loadData"
 *     [criteriaFactory]="createCriteria"
 *     [title]="'entity.header'"
 *     (onCreate)="openCreate()"
 *     (onEdit)="edit($event)"
 *     (onDelete)="delete($event)" />
 * ```
 */
@Component({
    selector: 'app-data-grid-list',
    imports: [NgTemplateOutlet, DataTableComponent, ServerDataTableComponent],
    templateUrl: './data-grid-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridListComponent {
    // --- Mode ---
    mode = input<'client' | 'server'>('client');

    // --- Shared Inputs ---
    columns = input<ColumnConfig[] | ServerColumnConfig[]>([]);
    title = input('');
    storageKey = input('');
    groupOptions = input<GroupOption[]>([]);
    groupingConfig = input<GroupingConfig>({});
    globalFilterFields = input<string[]>([]);
    dataKey = input('id');
    exportFileName = input('export');
    tableMinWidth = input('60rem');
    emptyMessage = input('common.noData');
    customCellFields = input<string[]>([]);

    // --- Client-side Inputs ---
    items = input<any[]>([]);
    loading = input(false);

    // --- Server-side Inputs ---
    dataLoader = input<DataLoadFn>();
    criteriaFactory = input<() => any>();
    exportDataLoader = input<ExportLoadFn>();
    initialRows = input(10);

    // --- Outputs ---
    onCreate = output<void>();
    onEdit = output<any>();
    onDelete = output<any>();
    onDeleteSelected = output<any[]>();

    // --- Child references for programmatic access ---
    customCellTpl = contentChild<TemplateRef<any>>('customCell');
    private clientTable = viewChild(DataTableComponent);
    private serverTable = viewChild(ServerDataTableComponent);

    /** Trigger a data reload (server mode only). */
    refresh() {
        this.serverTable()?.refresh();
    }
}
