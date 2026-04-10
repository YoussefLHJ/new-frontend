import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';

export interface AccordionItem {
    value: string | number;
    header: string;
    content: string;
}

/**
 * Data-driven accordion. Consumers supply `items` and the active panel
 * value; content can also be projected manually for fully custom panels.
 */
@Component({
    selector: 'app-accordion',
    standalone: true,
    imports: [CommonModule, AccordionModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-accordion [value]="activeValue" (valueChange)="activeValueChange.emit($event)" [multiple]="multiple">
            @for (item of items; track item.value) {
                <p-accordion-panel [value]="item.value">
                    <p-accordion-header>{{ item.header }}</p-accordion-header>
                    <p-accordion-content>
                        <p class="m-0">{{ item.content }}</p>
                    </p-accordion-content>
                </p-accordion-panel>
            }
            <ng-content></ng-content>
        </p-accordion>
    `
})
export class AccordionComponent {
    @Input() items: AccordionItem[] = [];
    @Input() activeValue: string | number | (string | number)[] = '0';
    @Input() multiple = false;
    @Output() activeValueChange = new EventEmitter<any>();
}
