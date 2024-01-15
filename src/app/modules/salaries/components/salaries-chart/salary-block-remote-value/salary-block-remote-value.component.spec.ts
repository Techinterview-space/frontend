import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { SalaryBlockRemoteValueComponent } from './salary-block-remote-value.component';

describe('SalaryBlockRemoteValueComponent', () => {
  let component: SalaryBlockRemoteValueComponent;
  let fixture: ComponentFixture<SalaryBlockRemoteValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryBlockRemoteValueComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryBlockRemoteValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
