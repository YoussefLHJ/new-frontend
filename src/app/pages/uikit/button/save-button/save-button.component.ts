import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
    selector: 'app-save-button',
    standalone: true,
    imports: [BaseButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-base-button
            [label]="label"
            [icon]="icon"
            severity="success"
            [loading]="loading"
            [disabled]="disabled"
            [rounded]="rounded"
            [outlined]="outlined"
            [text]="text"
            type="submit"
            [styleClass]="styleClass"
            (clicked)="clicked.emit($event)"
        ></app-base-button>
    `
})
export class SaveButtonComponent {
    @Input() label = 'Save';
    @Input() icon = 'pi pi-check';
    @Input() loading = false;
    @Input() disabled = false;
    @Input() rounded = false;
    @Input() outlined = false;
    @Input() text = false;
    @Input() styleClass = '';

    @Output() clicked = new EventEmitter<MouseEvent>();
}
