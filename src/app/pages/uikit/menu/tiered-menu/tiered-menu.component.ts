import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
    selector: 'app-tiered-menu',
    standalone: true,
    imports: [TieredMenuModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-tieredmenu [model]="items"></p-tieredmenu>`
})
export class TieredMenuComponent {
    @Input() items: MenuItem[] = [];
}
