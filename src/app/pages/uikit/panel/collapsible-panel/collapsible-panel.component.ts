import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'app-collapsible-panel',
    standalone: true,
    imports: [PanelModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-panel
            [header]="header"
            [toggleable]="toggleable"
            [collapsed]="collapsed"
            (collapsedChange)="collapsedChange.emit($event)"
        >
            <ng-content></ng-content>
        </p-panel>
    `
})
export class CollapsiblePanelComponent {
    @Input() header = '';
    @Input() toggleable = true;
    @Input() collapsed = false;
    @Output() collapsedChange = new EventEmitter<boolean>();
}
