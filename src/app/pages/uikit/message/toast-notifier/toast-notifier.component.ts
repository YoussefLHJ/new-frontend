import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ToastModule } from 'primeng/toast';

/**
 * Thin wrapper around `p-toast`. Consumers keep using PrimeNG's
 * `MessageService` (`.add(...)`) to trigger toasts — this component
 * only renders the outlet so it can be declared once on a page.
 */
@Component({
    selector: 'app-toast-notifier',
    standalone: true,
    imports: [ToastModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-toast [position]="position" [key]="key"></p-toast>`
})
export class ToastNotifierComponent {
    @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' | 'center' = 'top-right';
    @Input() key?: string;
}
