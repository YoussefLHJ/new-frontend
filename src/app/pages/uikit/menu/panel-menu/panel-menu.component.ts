import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
    selector: 'app-panel-menu',
    standalone: true,
    imports: [PanelMenuModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-panelmenu [model]="items" [multiple]="multiple"></p-panelmenu>`
})
export class PanelMenuComponent {
    @Input() items: MenuItem[] = [];
    @Input() multiple = false;
}
