import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-regression-plot',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgChartsModule],
  templateUrl: './regression-plot.component.html',
})
export class RegressionPlotComponent implements OnInit {
  @Input() data: { x: number; y: number }[] = [];
  @Input() result!: { slope: number; intercept: number; rSquared: number };

  scatterChartData: ChartConfiguration<'scatter'>['data'] = {
    datasets: [],
  };

  scatterChartOptions: ChartConfiguration<'scatter'>['options'] = {
    responsive: true,
  };

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (!this.data || !this.result) return;

    const regressionLine = this.data.map((point) => ({
      x: point.x,
      y: this.result.slope * point.x + this.result.intercept,
    }));

    this.scatterChartData = {
      datasets: [
        {
          label: 'Datos',
          data: this.data,
          backgroundColor: 'blue',
        },
        {
          label: 'Línea de regresión',
          data: regressionLine,
          borderColor: 'red',
          type: 'line',
          fill: false,
        },
      ],
    };
  }
}
