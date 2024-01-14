import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { SalariesByGradesChartComponent } from './salaries-by-grades-chart.component';

describe('SalariesByGradesChartComponent', () => {
  let component: SalariesByGradesChartComponent;
  let fixture: ComponentFixture<SalariesByGradesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalariesByGradesChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalariesByGradesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
