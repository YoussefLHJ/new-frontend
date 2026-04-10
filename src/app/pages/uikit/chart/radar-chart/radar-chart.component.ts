import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, effect, inject } from '@angular/core';
import { LayoutService } from '@/app/layout/service/layout.service';
import { BaseChartComponent } from '../base-chart/base-chart.component';
import { ChartDataset } from '../line-chart/line-chart.component';
import { radialOptions, readChartTheme } from '../chart-theme.util';

@Component({
    selector: 'app-radar-chart',
    standalone: true,
    imports: [BaseChartComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-base-chart type="radar" [data]="data" [options]="options" (dataSelected)="dataSelected.emit($event)"></app-base-chart>
    `
})
export class RadarChartComponent implements OnChanges {
    @Input() labels: string[] = [];
    @Input() datasets: ChartDataset[] = [];

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
        const t: any = readChartTheme();
        this.data = {
            labels: this.labels,
            datasets: this.datasets.map((ds) => {
                const color = t[ds.colorKey ?? 'indigo400'] ?? t.indigo400;
                return {
                    label: ds.label,
                    data: ds.data,
                    borderColor: color,
                    pointBackgroundColor: color,
                    pointBorderColor: color,
                    pointHoverBackgroundColor: t.textColor,
                    pointHoverBorderColor: color
                };
            })
        };
        this.options = radialOptions(t);
    }
}
