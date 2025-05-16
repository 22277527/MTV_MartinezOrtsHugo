import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-data-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatListModule, MatButtonModule],
  templateUrl: './data-input.component.html'
})
export class DataInputComponent {
  x: number | null = null;
  y: number | null = null;
  points: { x: number, y: number }[] = [];

  @Output() dataPoints = new EventEmitter<{ x: number, y: number }[]>();

  addPoint() {
    if (this.x !== null && this.y !== null) {
      this.points.push({ x: this.x, y: this.y });
      this.x = null;
      this.y = null;
      this.dataPoints.emit(this.points);
    }
  }
}