import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';

export interface TabPanelItem {
    value: string | number;
    header: string;
    content: string;
}

@Component({
    selector: 'app-tabs-panel',
    standalone: true,
    imports: [CommonModule, TabsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-tabs [value]="activeValue" (valueChange)="activeValueChange.emit($event)">
            <p-tablist>
                @for (t of items; track t.value) {
                    <p-tab [value]="t.value">{{ t.header }}</p-tab>
                }
            </p-tablist>
            <p-tabpanels>
                @for (t of items; track t.value) {
                    <p-tabpanel [value]="t.value">
                        <p class="m-0">{{ t.content }}</p>
                    </p-tabpanel>
                }
            </p-tabpanels>
        </p-tabs>
    `
})
export class TabsPanelComponent {
    @Input() items: TabPanelItem[] = [];
    @Input() activeValue: string | number = '0';
    @Output() activeValueChange = new EventEmitter<string | number>();
}
