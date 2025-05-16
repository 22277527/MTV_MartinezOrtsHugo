import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionPlotComponent } from './regression-plot.component';

describe('RegressionPlotComponent', () => {
  let component: RegressionPlotComponent;
  let fixture: ComponentFixture<RegressionPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegressionPlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegressionPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
