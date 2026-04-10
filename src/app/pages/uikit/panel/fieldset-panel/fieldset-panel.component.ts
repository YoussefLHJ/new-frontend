import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
    selector: 'app-fieldset-panel',
    standalone: true,
    imports: [FieldsetModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-fieldset [legend]="legend" [toggleable]="toggleable">
            <ng-content></ng-content>
        </p-fieldset>
    `
})
export class FieldsetPanelComponent {
    @Input() legend = '';
    @Input() toggleable = false;
}
