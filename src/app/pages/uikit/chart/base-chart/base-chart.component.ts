import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';

export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'polarArea' | 'radar';

/**
 * Generic, theme-aware wrapper around PrimeNG's `p-chart`.
 *
 * Every specialized chart component (line, bar, pie, ...) composes this
 * base. It only accepts data/options as inputs and never derives styling
 * itself — colors should be computed by the consumer or the specialized
 * wrappers using CSS variables (`--p-primary-500`, `--text-color`, ...).
 */
@Component({
    selector: 'app-base-chart',
    standalone: true,
    imports: [ChartModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-chart
            [type]="type"
            [data]="data"
            [options]="options"
            [plugins]="plugins"
            [width]="width"
            [height]="height"
            [responsive]="responsive"
            (onDataSelect)="dataSelected.emit($event)"
        ></p-chart>
    `
})
export class BaseChartComponent {
    @Input() type: ChartType = 'line';
    @Input() data: any = null;
    @Input() options: any = null;
    @Input() plugins: any[] = [];
    @Input() width?: string;
    @Input() height?: string;
    @Input() responsive = true;

    @Output() dataSelected = new EventEmitter<any>();
}
