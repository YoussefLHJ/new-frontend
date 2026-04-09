import { Component, model, input, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TranslateService } from '@ngx-translate/core';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';
import { ColumnConfig } from '../../models/data-grid.models';

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

    private readonly translate = inject(TranslateService);

    visibleColumns = computed(() => this.columns().filter(c => c.visible !== false));

    getFieldIcon(col: ColumnConfig): string {
        switch (col.type) {
            case 'boolean': return 'pi pi-check-circle';
            case 'date': return 'pi pi-calendar';
            case 'entity': return 'pi pi-link';
            case 'numeric': return 'pi pi-hashtag';
            default: return 'pi pi-align-left';
        }
    }

    getBooleanLabel(col: ColumnConfig): string {
        return this.item()[col.field]
            ? this.translate.instant(col.booleanTrueLabel || 'common.active')
            : this.translate.instant(col.booleanFalseLabel || 'common.inactive');
    }

    getBooleanSeverity(col: ColumnConfig): string {
        return this.item()[col.field]
            ? (col.booleanTrueSeverity || 'success')
            : (col.booleanFalseSeverity || 'danger');
    }

    onHide() {
        this.visible.set(false);
    }
}
