import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    selector: 'app-progress-bar',
    standalone: true,
    imports: [ProgressBarModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-progressbar [value]="value" [showValue]="showValue" [mode]="mode" [style]="style"></p-progressbar>`
})
export class ProgressBarComponent {
    @Input() value = 0;
    @Input() showValue = true;
    @Input() mode: 'determinate' | 'indeterminate' = 'determinate';
    @Input() style: any = null;
}
