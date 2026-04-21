import { Component, model, input, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';
import { ColumnConfig } from '../../models/data-grid.models';
import { DataDisplayService } from '../../services/data-display.service';

@Component({
    selector: 'app-view-detail-dialog',
    imports: [DialogModule, TagModule, ButtonModule, SignalTranslatePipe, DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './view-detail-dialog.component.html',
})
export class ViewDetailDialogComponent {
    item = input<any>(null);
    columns = input<ColumnConfig[]>([]);
    title = input('');
    visible = model(false);

    private readonly display = inject(DataDisplayService);

    visibleColumns = computed(() => this.columns().filter(c => c.visible !== false));

    getFieldIcon(col: ColumnConfig): string {
        return this.display.getFieldIcon(col);
    }

    getBooleanLabel(col: ColumnConfig): string {
        return this.display.getBooleanLabel(this.item()![col.field], col);
    }

    getBooleanSeverity(col: ColumnConfig): string {
        return this.display.getBooleanSeverity(this.item()![col.field], col);
    }

    onHide() {
        this.visible.set(false);
    }
}
