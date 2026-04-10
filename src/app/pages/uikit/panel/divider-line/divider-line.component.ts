import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-divider-line',
    standalone: true,
    imports: [DividerModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-divider [layout]="layout" [align]="align" [type]="type" [styleClass]="styleClass">
            <ng-content></ng-content>
        </p-divider>
    `
})
export class DividerLineComponent {
    @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
    @Input() align: 'left' | 'center' | 'right' | 'top' | 'bottom' = 'center';
    @Input() type: 'solid' | 'dashed' | 'dotted' = 'solid';
    @Input() styleClass = '';
}
