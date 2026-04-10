import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

/**
 * Thin tooltip wrapper. Since PrimeNG ships `pTooltip` as a directive
 * rather than a component, this host simply re-exports `TooltipModule`
 * so consumers can add a single import and use the directive on any
 * element inside their template.
 */
@Component({
    selector: 'app-tooltip-host',
    standalone: true,
    imports: [TooltipModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ng-content></ng-content>`
})
export class TooltipHostComponent {
    @Input() tip = '';
}
