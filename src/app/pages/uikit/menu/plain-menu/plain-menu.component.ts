import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-plain-menu',
    standalone: true,
    imports: [MenuModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-menu [model]="items"></p-menu>`
})
export class PlainMenuComponent {
    @Input() items: MenuItem[] = [];
}
