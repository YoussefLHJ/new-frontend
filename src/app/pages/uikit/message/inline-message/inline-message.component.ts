import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

export type InlineMessageSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
export type InlineMessageSize = 'small' | 'large';

/**
 * Thin reusable wrapper around `p-message`. Every specialized message
 * component (success, info, warn, error) composes this one.
 */
@Component({
    selector: 'app-inline-message',
    standalone: true,
    imports: [CommonModule, MessageModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-message [severity]="severity" [size]="size" [styleClass]="styleClass" [icon]="icon">
            <ng-content>{{ text }}</ng-content>
        </p-message>
    `
})
export class InlineMessageComponent {
    @Input() severity: InlineMessageSeverity = 'info';
    @Input() text = '';
    @Input() icon = '';
    @Input() size: InlineMessageSize = 'small';
    @Input() styleClass = '';
}
