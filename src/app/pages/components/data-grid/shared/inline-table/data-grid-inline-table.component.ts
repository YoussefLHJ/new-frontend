import {
    Component, ChangeDetectionStrategy, TemplateRef, contentChild, input, model
} from '@angular/core';
import { NgTemplateOutlet, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';
import { ColumnConfig } from '../../models/data-grid.models';

@Component({
    selector: 'app-data-grid-inline-table',
    standalone: true,
    imports: [TableModule, ButtonModule, TagModule, DividerModule, NgTemplateOutlet, SignalTranslatePipe, DatePipe],
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './data-grid-inline-table.component.html',
})
export class DataGridInlineTableComponent {
    items = model<any[]>([]);
    columns = input<ColumnConfig[]>([]);
    itemFactory = input.required<() => any>();

    formTpl = contentChild<TemplateRef<any>>('form');

    editingItem: any = null;
    editingIndex = -1;
    showForm = false;

    addItem() {
        this.editingItem = Object.assign({}, this.itemFactory()());
        this.editingIndex = -1;
        this.showForm = true;
    }

    editItem(item: any, index: number) {
        this.editingItem = Object.assign({}, item);
        this.editingIndex = index;
        this.showForm = true;
    }

    confirmItem() {
        const list = [...this.items()];
        if (this.editingIndex >= 0) {
            list[this.editingIndex] = this.editingItem;
        } else {
            list.push(this.editingItem);
        }
        this.items.set(list);
        this.cancelEdit();
    }

    deleteItem(index: number) {
        this.items.set(this.items().filter((_, i) => i !== index));
    }

    cancelEdit() {
        this.editingItem = null;
        this.editingIndex = -1;
        this.showForm = false;
    }

    getCellValue(item: any, col: ColumnConfig): any {
        return item[col.field];
    }
}
