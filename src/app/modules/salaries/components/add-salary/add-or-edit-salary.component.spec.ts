import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditSalaryComponent } from './add-or-edit-salary.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

describe('AddOrEditSalaryComponent', () => {
  let component: AddOrEditSalaryComponent;
  let fixture: ComponentFixture<AddOrEditSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEditSalaryComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
