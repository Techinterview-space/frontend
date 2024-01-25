import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAdminService } from '@services/user-admin.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { SalariesNotInStatsAdminPageComponent } from './salaries-not-in-stat-admin-page.component';

describe('SalariesNotInStatsAdminPageComponent', () => {
  let component: SalariesNotInStatsAdminPageComponent;
  let fixture: ComponentFixture<SalariesNotInStatsAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalariesNotInStatsAdminPageComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, UserAdminService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalariesNotInStatsAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
