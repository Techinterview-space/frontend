import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@shared/services/auth/auth.service';
import { SpinnerService } from '@shared/services/spinners/spinner-service';
import { SharedModule } from '@shared/shared.module';
import { MockAuthService, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { NgxSpinnerService } from 'ngx-spinner';

import { PricingBlockComponent } from './pricing-block.component';

describe('PricingBlockComponent', () => {
  let component: PricingBlockComponent;
  let fixture: ComponentFixture<PricingBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PricingBlockComponent],
      imports: [RouterTestingModule, SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        ...testUtilStubs,
        ...mostUsedServices,
        NgxSpinnerService,
        SpinnerService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
