import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
    selector: 'app-breadcrumb-bar',
    standalone: true,
    imports: [BreadcrumbModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-breadcrumb [model]="items" [home]="home"></p-breadcrumb>`
})
export class BreadcrumbBarComponent {
    @Input() items: MenuItem[] = [];
    @Input() home: MenuItem = { icon: 'pi pi-home', to: '/' };
}
