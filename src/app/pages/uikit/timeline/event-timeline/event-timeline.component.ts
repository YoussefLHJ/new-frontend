import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';

export interface TimelineEvent {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
}

export type TimelineLayout = 'vertical' | 'horizontal';
export type TimelineAlign = 'left' | 'right' | 'alternate' | 'top' | 'bottom';

/**
 * Reusable timeline. Supports three content modes:
 *  - `mode="status"`    → renders event.status (default)
 *  - `mode="date"`      → renders event.date, event.status as opposite
 *  - `mode="plain"`     → renders the event value itself (for string[])
 *
 * For fully custom markers/content, consumers can still drop `#marker` /
 * `#content` templates through projection.
 */
@Component({
    selector: 'app-event-timeline',
    standalone: true,
    imports: [CommonModule, TimelineModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-timeline [value]="events" [layout]="layout" [align]="align" [styleClass]="styleClass">
            <ng-template #marker let-event>
                @if (mode !== 'plain' && event?.color) {
                    <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm" [style.background-color]="event.color">
                        <i [class]="event.icon"></i>
                    </span>
                }
            </ng-template>
            <ng-template #content let-event>
                @switch (mode) {
                    @case ('plain') { {{ event }} }
                    @case ('date') { <small class="p-text-secondary">{{ event.date }}</small> }
                    @default { {{ event.status }} }
                }
            </ng-template>
            @if (mode === 'date') {
                <ng-template #opposite let-event>{{ event.status }}</ng-template>
            }
        </p-timeline>
    `
})
export class EventTimelineComponent {
    @Input() events: (TimelineEvent | string)[] = [];
    @Input() layout: TimelineLayout = 'vertical';
    @Input() align: TimelineAlign = 'left';
    @Input() mode: 'status' | 'date' | 'plain' = 'status';
    @Input() styleClass = '';
}
