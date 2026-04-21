import { Component, ChangeDetectionStrategy, model, input, output, TemplateRef, contentChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';

/**
 * Entry component for the data-grid edit feature.
 *
 * Provides a standardized dialog shell for entity editing forms,
 * matching the appareil edit-admin pattern. The form content is
 * provided by the host via content projection (`ng-content`).
 *
 * Usage:
 * ```html
 * <app-data-grid-edit
 *     [(visible)]="editDialogVisible"
 *     [title]="'entity.tabPan'"
 *     (onUpdate)="update()"
 *     (onCancel)="cancel()">
 *
 *     <!-- Entity-specific form fields -->
 *     <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
 *         <div class="flex flex-col gap-2">
 *             <label>{{'entity.field' | translate}}</label>
 *             <input pInputText [(ngModel)]="item.field" />
 *         </div>
 *     </div>
 * </app-data-grid-edit>
 * ```
 */
@Component({
    selector: 'app-data-grid-edit',
    standalone: true,
    imports: [DialogModule, ButtonModule, NgTemplateOutlet, SignalTranslatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './data-grid-edit.component.html',
})
export class DataGridEditComponent {
    visible = model(false);
    title = input('');
    dialogWidth = input('70vw');
    updateDisabled = input(false);

    onUpdate = output<void>();
    onCancel = output<void>();

    customContentTpl = contentChild<TemplateRef<any>>('formContent');

    hide() {
        this.onCancel.emit();
        this.visible.set(false);
    }
}
