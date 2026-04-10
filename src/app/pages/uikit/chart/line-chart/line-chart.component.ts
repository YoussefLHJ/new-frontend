import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, effect, inject } from '@angular/core';
import { LayoutService } from '@/app/layout/service/layout.service';
import { BaseChartComponent } from '../base-chart/base-chart.component';
import { cartesianOptions, readChartTheme } from '../chart-theme.util';

export interface ChartDataset {
    label: string;
    data: number[];
    colorKey?: 'primary500' | 'primary400' | 'primary200' | 'indigo500' | 'purple500' | 'teal500' | 'orange500';
    fill?: boolean;
    tension?: number;
}

/**
 * Reusable line chart. Consumers provide plain `labels` + `datasets` and
 * the component derives theme-aware colors and Chart.js options itself.
 */
@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [BaseChartComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-base-chart type="line" [data]="data" [options]="options" (dataSelected)="dataSelected.emit($event)"></app-base-chart>
    `
})
export class LineChartComponent implements OnChanges {
    @Input() labels: string[] = [];
    @Input() datasets: ChartDataset[] = [];
    @Input() aspectRatio = 0.8;

    @Output() dataSelected = new EventEmitter<any>();

    data: any = null;
    options: any = null;

    private layout = inject(LayoutService);

    constructor() {
        effect(() => {
            this.layout.layoutConfig().darkTheme;
            setTimeout(() => this.build(), 150);
        });
    }

    ngOnChanges(_: SimpleChanges): void {
        this.build();
    }

    private build(): void {
        const theme = readChartTheme();
        const palette: any = theme;
        this.data = {
            labels: this.labels,
            datasets: this.datasets.map((ds) => {
                const color = palette[ds.colorKey ?? 'primary500'];
                return {
                    label: ds.label,
                    data: ds.data,
                    fill: ds.fill ?? false,
                    backgroundColor: color,
                    borderColor: color,
                    tension: ds.tension ?? 0.4
                };
            })
        };
        this.options = cartesianOptions(theme, this.aspectRatio);
    }
}
