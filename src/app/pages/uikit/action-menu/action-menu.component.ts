import { Component, Input, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-action-menu',
    standalone: true,
    imports: [MenuModule, ButtonModule, RippleModule],
    templateUrl: './action-menu.component.html'
})
export class ActionMenuComponent {
    @Input() actions: MenuItem[] = [];
    @ViewChild('menu') menu!: Menu;

    toggle(event: Event): void {
        this.menu.toggle(event);
    }
}
