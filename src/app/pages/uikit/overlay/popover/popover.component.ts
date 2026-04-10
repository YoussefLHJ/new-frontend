import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { Popover, PopoverModule } from 'primeng/popover';

/**
 * Reusable popover. Parents call `.toggle(event)` / `.hide()` through a
 * template ref — this component just wraps `p-popover` so the styling
 * and default width are centralized.
 */
@Component({
    selector: 'app-popover',
    standalone: true,
    imports: [PopoverModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-popover #pop [style]="style">
            <ng-content></ng-content>
        </p-popover>
    `
})
export class PopoverComponent {
    @Input() style: any = { width: '450px' };

    @ViewChild('pop', { static: true }) pop!: Popover;

    toggle(event: Event) {
        this.pop.toggle(event);
    }

    hide() {
        this.pop.hide();
    }
}
