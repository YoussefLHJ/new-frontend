import {
    Component, ChangeDetectionStrategy, TemplateRef,
    contentChild, input, model, signal, computed
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
    // ── Core ──────────────────────────────────────────────────────────────
    items           = model<any[]>([]);
    columns         = input<ColumnConfig[]>([]);
    itemFactory     = input.required<() => any>();

    // ── Select-mode inputs ─────────────────────────────────────────────
    /** Items to pick from when mode === 'select'. Mode switcher hidden when empty. */
    existingItems            = input<any[]>([]);
    /** Field used as the primary label in the select list. */
    existingItemLabelField   = input('libelle');
    /** Optional secondary field shown as a subtitle in each row. */
    existingItemSubLabelField = input('');

    formTpl = contentChild<TemplateRef<any>>('form');

    // ── Create-mode state ─────────────────────────────────────────────
    editingItem:  any     = null;
    editingIndex: number  = -1;
    showForm:     boolean = false;

    // ── Mode-switching state ──────────────────────────────────────────
    mode                  = signal<'create' | 'select'>('create');
    selectedExistingItems = signal<any[]>([]);
    existingSearch        = signal('');

    filteredExisting = computed(() => {
        const search   = this.existingSearch().toLowerCase().trim();
        const field    = this.existingItemLabelField();
        const subField = this.existingItemSubLabelField();
        const items    = this.existingItems();
        if (!search) return items;
        return items.filter(item =>
            String(item[field] ?? '').toLowerCase().includes(search) ||
            (subField && String(item[subField] ?? '').toLowerCase().includes(search))
        );
    });

    // ── Create-mode actions ───────────────────────────────────────────

    addItem() {
        this.editingItem  = Object.assign({}, this.itemFactory()());
        this.editingIndex = -1;
        this.showForm     = true;
    }

    editItem(item: any, index: number) {
        this.editingItem  = Object.assign({}, item);
        this.editingIndex = index;
        this.showForm     = true;
    }

    confirmItem() {
        const list = [...(this.items() ?? [])];
        if (this.editingIndex >= 0) {
            list[this.editingIndex] = this.editingItem;
        } else {
            list.push(this.editingItem);
        }
        this.items.set(list);
        this.cancelEdit();
    }

    deleteItem(index: number) {
        this.items.set((this.items() ?? []).filter((_, i) => i !== index));
    }

    cancelEdit() {
        this.editingItem  = null;
        this.editingIndex = -1;
        this.showForm     = false;
    }

    // ── Select-mode actions ───────────────────────────────────────────

    setMode(m: 'create' | 'select') {
        this.mode.set(m);
        this.existingSearch.set('');
        this.selectedExistingItems.set([]);
        if (m === 'create') this.cancelEdit();
    }

    isExistingSelected(existingItem: any): boolean {
        return this.selectedExistingItems().some(s =>
            s === existingItem || (existingItem?.id != null && s?.id === existingItem.id)
        );
    }

    toggleExistingSelection(existingItem: any) {
        const current = this.selectedExistingItems();
        const idx = current.findIndex(s =>
            s === existingItem || (existingItem?.id != null && s?.id === existingItem.id)
        );
        if (idx >= 0) {
            this.selectedExistingItems.set(current.filter((_, i) => i !== idx));
        } else {
            this.selectedExistingItems.set([...current, existingItem]);
        }
    }

    addSelectedItems() {
        if (!this.selectedExistingItems().length) return;
        const toAdd = this.selectedExistingItems().map(i => ({ ...i }));
        this.items.set([...(this.items() ?? []), ...toAdd]);
        this.setMode('create');
    }

    // ── Shared ───────────────────────────────────────────────────────
    getCellValue(item: any, col: ColumnConfig): any {
        return item[col.field];
    }
}
