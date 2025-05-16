import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataInputComponent } from './components/data-input/data-input.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { RegressionPlotComponent } from './components/regression-plot/regression-plot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DataInputComponent,
    ResultsTableComponent,
    RegressionPlotComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  data: { x: number; y: number }[] = [];
  result: { slope: number; intercept: number; rSquared: number } | null = null;

  onDataPoints(points: { x: number; y: number }[]) {
    this.data = points;
    this.calculateRegression(points);
  }

  calculateRegression(data: { x: number; y: number }[]) {
    const n = data.length;
    if (n === 0) {
      this.result = null;
      return;
    }

    const sumX = data.reduce((acc, point) => acc + point.x, 0);
    const sumY = data.reduce((acc, point) => acc + point.y, 0);
    const sumXY = data.reduce((acc, point) => acc + point.x * point.y, 0);
    const sumX2 = data.reduce((acc, point) => acc + point.x * point.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const ssTotal = data.reduce((acc, point) => acc + Math.pow(point.y - sumY / n, 2), 0);
    const ssRes = data.reduce((acc, point) => acc + Math.pow(point.y - (slope * point.x + intercept), 2), 0);
    const rSquared = 1 - ssRes / ssTotal;

    this.result = { slope, intercept, rSquared };
  }
}
