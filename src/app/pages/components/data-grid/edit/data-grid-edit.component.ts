import { Component, ChangeDetectionStrategy, TemplateRef, contentChild, model, input, output } from '@angular/core';
import { AppDialogFormComponent } from '@/app/pages/uikit/app-dialog-form.component';

@Component({
    selector: 'app-data-grid-edit',
    standalone: true,
    imports: [AppDialogFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-dialog-form
            [(visible)]="visible"
            [title]="title()"
            [dialogWidth]="dialogWidth()"
            [actionDisabled]="updateDisabled()"
            [contentTpl]="customContentTpl() ?? null"
            (onAction)="onUpdate.emit()"
            (onCancel)="onCancel.emit()">
            <ng-content></ng-content>
        </app-dialog-form>
    `
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
