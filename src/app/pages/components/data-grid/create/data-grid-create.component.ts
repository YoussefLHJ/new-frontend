import { Component, ChangeDetectionStrategy, model, input, output, TemplateRef, contentChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';

/**
 * Entry component for the data-grid create feature.
 *
 * Provides a standardized dialog shell for entity creation forms,
 * matching the appareil create-admin pattern. The form content is
 * provided by the host via content projection (`ng-content`).
 *
 * Usage:
 * ```html
 * <app-data-grid-create
 *     [(visible)]="createDialogVisible"
 *     [title]="'entity.tabPan'"
 *     (onSave)="save()"
 *     (onCancel)="cancel()">
 *
 *     <!-- Entity-specific form fields -->
 *     <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
 *         <div class="flex flex-col gap-2">
 *             <label>{{'entity.field' | translate}}</label>
 *             <input pInputText [(ngModel)]="item.field" />
 *         </div>
 *     </div>
 * </app-data-grid-create>
 * ```
 */
@Component({
    selector: 'app-data-grid-create',
    imports: [DialogModule, ButtonModule, NgTemplateOutlet, SignalTranslatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'data-grid-create.component.html',
})
export class DataGridCreateComponent {
    visible = model(false);
    title = input('');
    dialogWidth = input('70vw');
    saveDisabled = input(false);

    onSave = output<void>();
    onCancel = output<void>();

    customContentTpl = contentChild<TemplateRef<any>>('formContent');

    hide() {
        this.onCancel.emit();
        this.visible.set(false);
    }
}
