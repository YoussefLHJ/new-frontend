import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

export type BadgeSeverity = 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast';
export type BadgeSize = 'small' | 'large' | 'xlarge';

@Component({
    selector: 'app-badge',
    standalone: true,
    imports: [BadgeModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-badge [value]="value" [severity]="severity" [badgeSize]="badgeSize" [styleClass]="styleClass"></p-badge>`
})
export class BadgeComponent {
    @Input() value: string | number = '';
    @Input() severity: BadgeSeverity | undefined = undefined;
    @Input() badgeSize?: BadgeSize;
    @Input() styleClass = '';
}
