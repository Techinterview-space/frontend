import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { SalariesPaginatedTableComponent } from './salaries-paginated-table.component';

describe('SalariesPaginatedTableComponent', () => {
  let component: SalariesPaginatedTableComponent;
  let fixture: ComponentFixture<SalariesPaginatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalariesPaginatedTableComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalariesPaginatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
