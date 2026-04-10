import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';

@Component({
    selector: 'app-context-menu',
    standalone: true,
    imports: [ContextMenuModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-contextmenu [target]="target" [model]="items"></p-contextmenu>`
})
export class ContextMenuComponent {
    @Input() target: HTMLElement | ElementRef | null = null;
    @Input() items: MenuItem[] = [];
}
