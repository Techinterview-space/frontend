import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { PeopleByGradesChartComponent } from './people-by-grades-chart.component';

describe('PeopleByGradesChartComponent', () => {
  let component: PeopleByGradesChartComponent;
  let fixture: ComponentFixture<PeopleByGradesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleByGradesChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleByGradesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
