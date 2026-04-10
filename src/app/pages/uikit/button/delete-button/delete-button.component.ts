import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
    selector: 'app-delete-button',
    standalone: true,
    imports: [BaseButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-base-button
            [label]="label"
            [icon]="icon"
            severity="danger"
            [loading]="loading"
            [disabled]="disabled"
            [rounded]="rounded"
            [outlined]="outlined"
            [text]="text"
            type="button"
            [styleClass]="styleClass"
            [ariaLabel]="ariaLabel"
            (clicked)="clicked.emit($event)"
        ></app-base-button>
    `
})
export class DeleteButtonComponent {
    @Input() label = 'Delete';
    @Input() icon = 'pi pi-trash';
    @Input() loading = false;
    @Input() disabled = false;
    @Input() rounded = false;
    @Input() outlined = false;
    @Input() text = false;
    @Input() styleClass = '';
    @Input() ariaLabel = 'Delete item';

    @Output() clicked = new EventEmitter<MouseEvent>();
}
