import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { SalaryBlockValueComponent } from './salary-block-value.component';

describe('SalaryBlockValueComponent', () => {
  let component: SalaryBlockValueComponent;
  let fixture: ComponentFixture<SalaryBlockValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryBlockValueComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryBlockValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
