import { Component, ChangeDetectionStrategy, input, model } from '@angular/core';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';

/**
 * Generic collapsible section for form dialogs.
 * Smooth CSS grid animation — no Angular animations dependency.
 * Usage: <app-collapsible-section title="i18n.key" icon="pi-icon" subtitle="subtitle.key">
 *            ... content ...
 *        </app-collapsible-section>
 */
@Component({
    selector: 'app-collapsible-section',
    standalone: true,
    imports: [SignalTranslatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { style: 'display: block' },
    styles: [`
        .s-body {
            display: grid;
            grid-template-rows: 1fr;
            transition: grid-template-rows 0.28s ease, opacity 0.22s ease;
            opacity: 1;
        }
        .s-body.closed {
            grid-template-rows: 0fr;
            opacity: 0;
            pointer-events: none;
        }
        .s-inner { min-height: 0; overflow: hidden; }
        .s-chevron { transition: transform 0.25s ease; display: inline-block; }
        .s-chevron.rotated { transform: rotate(-90deg); }
    `],
    template: `
        <button type="button" (click)="toggle()"
                class="w-full flex items-center justify-between px-6 py-5
                       hover:bg-surface-50 dark:hover:bg-surface-800
                       transition-colors duration-150 text-left group
                       border-0 bg-transparent cursor-pointer outline-none"
                [attr.aria-expanded]="expanded()">
            <div class="flex items-center gap-3">
                @if (icon()) {
                    <span class="flex items-center justify-center w-9 h-9 rounded-xl
                                 bg-primary/10 shrink-0
                                 group-hover:bg-primary/15 transition-colors duration-150">
                        <i [class]="'pi ' + icon() + ' text-primary text-sm'"></i>
                    </span>
                }
                <div>
                    <p class="font-semibold text-color text-sm m-0">{{ title() | translate }}</p>
                    @if (subtitle()) {
                        <p class="text-xs text-muted-color m-0 mt-0.5">{{ subtitle() | translate }}</p>
                    }
                </div>
            </div>
            <i class="pi pi-chevron-down text-muted-color text-xs s-chevron"
               [class.rotated]="!expanded()"></i>
        </button>
        <div class="s-body" [class.closed]="!expanded()">
            <div class="s-inner">
                <div class="px-6 pb-5">
                    <ng-content />
                </div>
            </div>
        </div>
    `
})
export class AppCollapsibleSectionComponent {
    title    = input('');
    subtitle = input('');
    icon     = input('');
    expanded = model(true);

    toggle() {
        this.expanded.update(v => !v);
    }
}
