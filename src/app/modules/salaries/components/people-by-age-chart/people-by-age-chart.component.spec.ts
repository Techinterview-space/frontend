import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { PeopleByAgeChartComponent } from './people-by-age-chart.component';

describe('PeopleByAgeChartComponent', () => {
  let component: PeopleByAgeChartComponent;
  let fixture: ComponentFixture<PeopleByAgeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleByAgeChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleByAgeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
