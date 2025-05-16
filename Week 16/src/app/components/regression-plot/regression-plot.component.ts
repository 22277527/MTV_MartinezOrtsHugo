import { Component, Input } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-regression-plot',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgChartsModule],
  templateUrl: './regression-plot.component.html'
})
export class RegressionPlotComponent {
  @Input() data: { x: number, y: number }[] = [];
  @Input() result: { slope: number, intercept: number, r2: number } | null = null;

  get chartData(): ChartConfiguration<'line'>['data'] {
    const points = this.data.map(p => ({ x: p.x, y: p.y }));
    const regression = this.result ? [
      { x: Math.min(...this.data.map(p => p.x)), y: this.result.intercept + this.result.slope * Math.min(...this.data.map(p => p.x)) },
      { x: Math.max(...this.data.map(p => p.x)), y: this.result.intercept + this.result.slope * Math.max(...this.data.map(p => p.x)) },
    ] : [];

    return {
      datasets: [
        {
          label: 'Datos',
          data: points,
          type: 'scatter',
          backgroundColor: 'blue'
        },
        {
          label: 'Regresión',
          data: regression,
          type: 'line',
          borderColor: 'red',
          borderWidth: 2,
          fill: false,
          pointRadius: 0
        }
      ]
    };
  }

  chartOptions: ChartConfiguration['options'] = {
    responsive: true
  };
}