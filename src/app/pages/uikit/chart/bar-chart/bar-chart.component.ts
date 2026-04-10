import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, effect, inject } from '@angular/core';
import { LayoutService } from '@/app/layout/service/layout.service';
import { BaseChartComponent } from '../base-chart/base-chart.component';
import { ChartDataset, LineChartComponent } from '../line-chart/line-chart.component';
import { cartesianOptions, readChartTheme } from '../chart-theme.util';

@Component({
    selector: 'app-bar-chart',
    standalone: true,
    imports: [BaseChartComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-base-chart type="bar" [data]="data" [options]="options" (dataSelected)="dataSelected.emit($event)"></app-base-chart>
    `
})
export class BarChartComponent implements OnChanges {
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
        const theme: any = readChartTheme();
        this.data = {
            labels: this.labels,
            datasets: this.datasets.map((ds) => {
                const color = theme[ds.colorKey ?? 'primary500'];
                return {
                    label: ds.label,
                    data: ds.data,
                    backgroundColor: color,
                    borderColor: color
                };
            })
        };
        this.options = cartesianOptions(theme, this.aspectRatio);
    }
}
