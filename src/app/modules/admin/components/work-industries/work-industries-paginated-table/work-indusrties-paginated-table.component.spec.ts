import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { WorkIndustriesPaginatedTableComponent } from './work-indusrties-paginated-table.component';
import { WorkIndusrtiesService } from '@services/work-industry.service';

describe('WorkIndustriesPaginatedTableComponent', () => {
  let component: WorkIndustriesPaginatedTableComponent;
  let fixture: ComponentFixture<WorkIndustriesPaginatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkIndustriesPaginatedTableComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, WorkIndusrtiesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkIndustriesPaginatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
