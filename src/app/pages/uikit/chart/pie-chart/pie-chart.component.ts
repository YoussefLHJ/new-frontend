import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, effect, inject } from '@angular/core';
import { LayoutService } from '@/app/layout/service/layout.service';
import { BaseChartComponent, ChartType } from '../base-chart/base-chart.component';
import { readChartTheme } from '../chart-theme.util';

@Component({
    selector: 'app-pie-chart',
    standalone: true,
    imports: [BaseChartComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-base-chart [type]="variant" [data]="data" [options]="options" (dataSelected)="dataSelected.emit($event)"></app-base-chart>
    `
})
export class PieChartComponent implements OnChanges {
    @Input() labels: string[] = [];
    @Input() values: number[] = [];
    /** `pie` (default) or `doughnut`. */
    @Input() variant: Extract<ChartType, 'pie' | 'doughnut'> = 'pie';

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
        const t = readChartTheme();
        const base = [t.indigo500, t.purple500, t.teal500, t.orange500];
        const hover = [t.indigo400, t.purple400, t.teal400, t.orange500];
        this.data = {
            labels: this.labels,
            datasets: [
                {
                    data: this.values,
                    backgroundColor: base.slice(0, this.values.length),
                    hoverBackgroundColor: hover.slice(0, this.values.length)
                }
            ]
        };
        this.options = {
            plugins: {
                legend: {
                    labels: { usePointStyle: true, color: t.textColor }
                }
            }
        };
    }
}
