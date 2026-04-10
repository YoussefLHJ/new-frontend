import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CardModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-card [header]="header" [subheader]="subheader" [styleClass]="styleClass">
            <ng-content></ng-content>
        </p-card>
    `
})
export class CardComponent {
    @Input() header = '';
    @Input() subheader = '';
    @Input() styleClass = '';
}
