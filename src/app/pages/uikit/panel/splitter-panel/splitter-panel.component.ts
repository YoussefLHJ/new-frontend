import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';

/**
 * Reusable splitter wrapper. Consumers project panel bodies via the
 * PrimeNG `#panel` template. Kept intentionally minimal — splitters are
 * composition primitives and should stay flexible.
 */
@Component({
    selector: 'app-splitter-panel',
    standalone: true,
    imports: [SplitterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-splitter
            [style]="style"
            [layout]="layout"
            [panelSizes]="panelSizes"
            [minSizes]="minSizes"
            [styleClass]="styleClass"
        >
            <ng-content></ng-content>
        </p-splitter>
    `
})
export class SplitterPanelComponent {
    @Input() style: any = { height: '300px' };
    @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
    @Input() panelSizes: number[] = [50, 50];
    @Input() minSizes: number[] = [0, 0];
    @Input() styleClass = '';
}
