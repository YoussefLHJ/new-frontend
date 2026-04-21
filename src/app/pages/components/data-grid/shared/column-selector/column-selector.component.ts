import { Component, inject, input, output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';
import { ColumnConfig } from '../../models/data-grid.models';

@Component({
    selector: 'app-column-selector',
    imports: [FormsModule, ButtonModule, PopoverModule, CheckboxModule, TooltipModule, SignalTranslatePipe],
    templateUrl: './column-selector.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnSelectorComponent implements OnInit {
    columns = input<ColumnConfig[]>([]);
    storageKey = input('');
    columnsChanged = output<ColumnConfig[]>();

    ngOnInit() {
        this.loadFromStorage();
    }

    onVisibilityChange() {
        this.saveToStorage();
        this.columnsChanged.emit(this.columns());
    }

    private loadFromStorage() {
        const key = this.storageKey();
        if (!key) return;
        try {
            const saved = localStorage.getItem(`col-visibility-${key}`);
            if (saved) {
                const visibility: Record<string, boolean> = JSON.parse(saved);
                this.columns().forEach(col => {
                    if (visibility[col.field] !== undefined) {
                        col.visible = visibility[col.field];
                    }
                });
            }
        } catch { /* ignore invalid storage */ }
    }

    private saveToStorage() {
        const key = this.storageKey();
        if (!key) return;
        const visibility: Record<string, boolean> = {};
        this.columns().forEach(col => visibility[col.field] = col.visible !== false);
        localStorage.setItem(`col-visibility-${key}`, JSON.stringify(visibility));
    }
}
