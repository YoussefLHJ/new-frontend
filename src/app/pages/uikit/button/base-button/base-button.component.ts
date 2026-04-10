import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

export type ButtonSeverity = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';
export type ButtonType = 'button' | 'submit' | 'reset';
export type IconPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Generic, reusable wrapper around PrimeNG's `p-button`.
 *
 * All specialized buttons (save, cancel, delete, export, ...) compose this
 * component so that the underlying PrimeNG API is wrapped in exactly one
 * place. Consumers should prefer the specialized buttons whenever possible.
 */
@Component({
    selector: 'app-base-button',
    standalone: true,
    imports: [ButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-button
            [label]="label"
            [icon]="icon"
            [iconPos]="iconPos"
            [severity]="severity"
            [loading]="loading"
            [disabled]="disabled"
            [rounded]="rounded"
            [text]="text"
            [outlined]="outlined"
            [raised]="raised"
            [type]="type"
            [styleClass]="styleClass"
            [ariaLabel]="ariaLabel || label"
            (onClick)="clicked.emit($event)"
            (onFocus)="focused.emit($event)"
            (onBlur)="blurred.emit($event)"
        >
            <ng-content></ng-content>
        </p-button>
    `
})
export class BaseButtonComponent {
    @Input() label = '';
    @Input() icon = '';
    @Input() iconPos: IconPosition = 'left';
    @Input() severity: ButtonSeverity = 'primary';
    @Input() loading = false;
    @Input() disabled = false;
    @Input() rounded = false;
    @Input() text = false;
    @Input() outlined = false;
    @Input() raised = false;
    @Input() type: ButtonType = 'button';
    @Input() styleClass = '';
    @Input() ariaLabel?: string;

    @Output() clicked = new EventEmitter<MouseEvent>();
    @Output() focused = new EventEmitter<FocusEvent>();
    @Output() blurred = new EventEmitter<FocusEvent>();
}
