import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';

@Component({
    selector: 'app-mega-menu',
    standalone: true,
    imports: [MegaMenuModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-megamenu [model]="items" [orientation]="orientation"></p-megamenu>`
})
export class MegaMenuComponent {
    @Input() items: MegaMenuItem[] = [];
    @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
}
