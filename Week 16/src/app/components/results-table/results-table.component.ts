import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './results-table.component.html'
})
export class ResultsTableComponent {
  @Input() result: { slope: number; intercept: number; r2: number } | null = null;
}