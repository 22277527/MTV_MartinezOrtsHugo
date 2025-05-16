import { Injectable } from '@angular/core';

export interface DataPoint {
  x: number;
  y: number;
}

export interface RegressionResult {
  meanX: number;
  meanY: number;
  varX: number;
  varY: number;
  covXY: number;
  beta1: number;
  beta0: number;
  r: number;
  r2: number;
  residualVariance: number;
  predictedY: number[];
}

@Injectable({
  providedIn: 'root'
})
export class RegressionService {
  compute(data: DataPoint[]): RegressionResult {
    const n = data.length;
    const xs = data.map(p => p.x);
    const ys = data.map(p => p.y);

    const meanX = xs.reduce((a, b) => a + b, 0) / n;
    const meanY = ys.reduce((a, b) => a + b, 0) / n;

    const varX = xs.reduce((sum, x) => sum + (x - meanX) ** 2, 0) / n;
    const varY = ys.reduce((sum, y) => sum + (y - meanY) ** 2, 0) / n;
    const covXY = data.reduce((sum, p) => sum + (p.x - meanX) * (p.y - meanY), 0) / n;

    const beta1 = covXY / varX;
    const beta0 = meanY - beta1 * meanX;

    const predictedY = xs.map(x => beta0 + beta1 * x);
    const ssRes = ys.reduce((sum, y, i) => sum + (y - predictedY[i]) ** 2, 0);
    const ssTot = ys.reduce((sum, y) => sum + (y - meanY) ** 2, 0);

    const r2 = 1 - ssRes / ssTot;
    const r = Math.sqrt(r2);
    const residualVariance = ssRes / n;

    return { meanX, meanY, varX, varY, covXY, beta0, beta1, r2, r, residualVariance, predictedY };
  }
}
