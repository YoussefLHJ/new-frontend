import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TabsModule } from 'primeng/tabs';

export interface TabItem {
    value: number | string;
    label: string;
}

@Component({
    selector: 'app-tab-menu',
    standalone: true,
    imports: [TabsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-tabs [value]="activeValue" (valueChange)="activeValueChange.emit($event)">
            <p-tablist>
                @for (tab of tabs; track tab.value) {
                    <p-tab [value]="tab.value">{{ tab.label }}</p-tab>
                }
            </p-tablist>
        </p-tabs>
    `
})
export class TabMenuComponent {
    @Input() tabs: TabItem[] = [];
    @Input() activeValue: number | string = 0;
    @Output() activeValueChange = new EventEmitter<number | string>();
}
