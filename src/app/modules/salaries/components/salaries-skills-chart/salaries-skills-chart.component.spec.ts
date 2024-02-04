import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { SalariesSkillsChartComponent } from './salaries-skills-chart.component';

describe('SalariesByGradesChartComponent', () => {
  let component: SalariesSkillsChartComponent;
  let fixture: ComponentFixture<SalariesSkillsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalariesSkillsChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalariesSkillsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
