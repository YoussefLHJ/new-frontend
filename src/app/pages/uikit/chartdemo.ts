import { Component } from '@angular/core';
import { FluidModule } from 'primeng/fluid';

import { LineChartComponent, ChartDataset } from './chart/line-chart/line-chart.component';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';
import { PolarChartComponent } from './chart/polar-chart/polar-chart.component';
import { RadarChartComponent } from './chart/radar-chart/radar-chart.component';

@Component({
    selector: 'app-chart-demo',
    standalone: true,
    imports: [FluidModule, LineChartComponent, BarChartComponent, PieChartComponent, PolarChartComponent, RadarChartComponent],
    template: `
        <p-fluid class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-6">
                <div class="card">
                    <div class="font-semibold text-xl mb-6">Linear</div>
                    <app-line-chart [labels]="months" [datasets]="lineDatasets"></app-line-chart>
                </div>
            </div>

            <div class="col-span-12 xl:col-span-6">
                <div class="card">
                    <div class="font-semibold text-xl mb-6">Bar</div>
                    <app-bar-chart [labels]="months" [datasets]="barDatasets"></app-bar-chart>
                </div>
            </div>

            <div class="col-span-12 xl:col-span-6">
                <div class="card flex flex-col items-center">
                    <div class="font-semibold text-xl mb-6">Pie</div>
                    <app-pie-chart [labels]="pieLabels" [values]="pieValues" variant="pie"></app-pie-chart>
                </div>
            </div>

            <div class="col-span-12 xl:col-span-6">
                <div class="card flex flex-col items-center">
                    <div class="font-semibold text-xl mb-6">Doughnut</div>
                    <app-pie-chart [labels]="pieLabels" [values]="pieValues" variant="doughnut"></app-pie-chart>
                </div>
            </div>

            <div class="col-span-12 xl:col-span-6">
                <div class="card flex flex-col items-center">
                    <div class="font-semibold text-xl mb-6">Polar Area</div>
                    <app-polar-chart [labels]="polarLabels" [values]="polarValues"></app-polar-chart>
                </div>
            </div>

            <div class="col-span-12 xl:col-span-6">
                <div class="card flex flex-col items-center">
                    <div class="font-semibold text-xl mb-6">Radar</div>
                    <app-radar-chart [labels]="radarLabels" [datasets]="radarDatasets"></app-radar-chart>
                </div>
            </div>
        </p-fluid>
    `
})
export class ChartDemo {
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    lineDatasets: ChartDataset[] = [
        { label: 'First Dataset', data: [65, 59, 80, 81, 56, 55, 40], colorKey: 'primary500' },
        { label: 'Second Dataset', data: [28, 48, 40, 19, 86, 27, 90], colorKey: 'primary200' }
    ];

    barDatasets: ChartDataset[] = [
        { label: 'My First dataset', data: [65, 59, 80, 81, 56, 55, 40], colorKey: 'primary500' },
        { label: 'My Second dataset', data: [28, 48, 40, 19, 86, 27, 90], colorKey: 'primary200' }
    ];

    pieLabels = ['A', 'B', 'C'];
    pieValues = [540, 325, 702];

    polarLabels = ['Indigo', 'Purple', 'Teal', 'Orange'];
    polarValues = [11, 16, 7, 3];

    radarLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
    radarDatasets: ChartDataset[] = [
        { label: 'My First dataset', data: [65, 59, 90, 81, 56, 55, 40], colorKey: 'indigo500' },
        { label: 'My Second dataset', data: [28, 48, 40, 19, 96, 27, 100], colorKey: 'purple500' }
    ];
}
