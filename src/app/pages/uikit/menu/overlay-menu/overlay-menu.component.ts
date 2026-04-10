import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { BaseButtonComponent } from '../../button/base-button/base-button.component';

@Component({
    selector: 'app-overlay-menu',
    standalone: true,
    imports: [MenuModule, BaseButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-menu #menu [popup]="true" [model]="items"></p-menu>
        <app-base-button [label]="triggerLabel" [icon]="triggerIcon" severity="secondary" (clicked)="menu.toggle($event)"></app-base-button>
    `
})
export class OverlayMenuComponent {
    @Input() items: MenuItem[] = [];
    @Input() triggerLabel = 'Options';
    @Input() triggerIcon = 'pi pi-chevron-down';

    @ViewChild('menu') menu?: Menu;
}
