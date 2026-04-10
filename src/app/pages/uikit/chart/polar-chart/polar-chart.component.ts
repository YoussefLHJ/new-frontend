import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, effect, inject } from '@angular/core';
import { LayoutService } from '@/app/layout/service/layout.service';
import { BaseChartComponent } from '../base-chart/base-chart.component';
import { radialOptions, readChartTheme } from '../chart-theme.util';

@Component({
    selector: 'app-polar-chart',
    standalone: true,
    imports: [BaseChartComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-base-chart type="polarArea" [data]="data" [options]="options" (dataSelected)="dataSelected.emit($event)"></app-base-chart>
    `
})
export class PolarChartComponent implements OnChanges {
    @Input() labels: string[] = [];
    @Input() values: number[] = [];
    @Input() datasetLabel = 'Dataset';

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
        this.data = {
            labels: this.labels,
            datasets: [
                {
                    data: this.values,
                    label: this.datasetLabel,
                    backgroundColor: [t.indigo500, t.purple500, t.teal500, t.orange500].slice(0, this.values.length)
                }
            ]
        };
        this.options = radialOptions(t);
    }
}
