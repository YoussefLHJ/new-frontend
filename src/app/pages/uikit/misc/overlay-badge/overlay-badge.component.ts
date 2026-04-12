import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'app-overlay-badge',
    standalone: true,
    imports: [OverlayBadgeModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-overlaybadge [value]="value" [severity]="severity" [styleClass]="styleClass">
            <ng-content></ng-content>
        </p-overlaybadge>
    `
})
export class OverlayBadgeComponent {
    @Input() value?: string | number;
    @Input() severity: 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast' | undefined = undefined;
    @Input() styleClass = '';
}
