import { Component, ChangeDetectionStrategy, TemplateRef, input, model, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';

@Component({
    selector: 'app-dialog-form',
    standalone: true,
    imports: [DialogModule, ButtonModule, NgTemplateOutlet, SignalTranslatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app-dialog-form.component.html'
})
export class AppDialogFormComponent {
    visible = model(false);
    title = input('');
    dialogWidth = input('70vw');
    actionDisabled = input(false);
    showAction = input(true);
    cancelLabel = input('cancel');
    contentTpl = input<TemplateRef<any> | null>(null);

    onAction = output<void>();
    onCancel = output<void>();

    hide() {
        this.onCancel.emit();
        this.visible.set(false);
    }
}
