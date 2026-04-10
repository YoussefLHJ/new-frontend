import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-menubar',
    standalone: true,
    imports: [CommonModule, MenubarModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-menubar [model]="model">
            <ng-template #end>
                <ng-content select="[slot=end]"></ng-content>
            </ng-template>
            <ng-template #start>
                <ng-content select="[slot=start]"></ng-content>
            </ng-template>
        </p-menubar>
    `
})
export class MenubarComponent {
    @Input() model: MenuItem[] = [];
}
