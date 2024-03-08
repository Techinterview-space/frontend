import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { PeopleByExperienceChartComponent } from './people-by-experience-chart.component';

describe('PeopleByExperienceChartComponent', () => {
  let component: PeopleByExperienceChartComponent;
  let fixture: ComponentFixture<PeopleByExperienceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleByExperienceChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleByExperienceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
