import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
    selector: 'app-cancel-button',
    standalone: true,
    imports: [BaseButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-base-button
            [label]="label"
            [icon]="icon"
            severity="secondary"
            [loading]="loading"
            [disabled]="disabled"
            [rounded]="rounded"
            [outlined]="true"
            [text]="text"
            type="button"
            [styleClass]="styleClass"
            (clicked)="clicked.emit($event)"
        ></app-base-button>
    `
})
export class CancelButtonComponent {
    @Input() label = 'Cancel';
    @Input() icon = 'pi pi-times';
    @Input() loading = false;
    @Input() disabled = false;
    @Input() rounded = false;
    @Input() text = false;
    @Input() styleClass = '';

    @Output() clicked = new EventEmitter<MouseEvent>();
}
