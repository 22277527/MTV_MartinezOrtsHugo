import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataInputComponent } from './components/data-input/data-input.component';
import { RegressionPlotComponent } from './components/regression-plot/regression-plot.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DataInputComponent,
    RegressionPlotComponent,
    ResultsTableComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  data: { x: number; y: number }[] = [];
  result: { slope: number; intercept: number; r2: number } | null = null;

  onDataPoints(points: { x: number; y: number }[]) {
    this.data = points;
    if (points.length < 2) return;

    const n = points.length;
    const sumX = points.reduce((acc, p) => acc + p.x, 0);
    const sumY = points.reduce((acc, p) => acc + p.y, 0);
    const sumXY = points.reduce((acc, p) => acc + p.x * p.y, 0);
    const sumX2 = points.reduce((acc, p) => acc + p.x * p.x, 0);
    const sumY2 = points.reduce((acc, p) => acc + p.y * p.y, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const ssTot = points.reduce((acc, p) => acc + Math.pow(p.y - sumY / n, 2), 0);
    const ssRes = points.reduce((acc, p) => acc + Math.pow(p.y - (slope * p.x + intercept), 2), 0);
    const r2 = 1 - ssRes / ssTot;

    this.result = { slope, intercept, r2 };
  }
}