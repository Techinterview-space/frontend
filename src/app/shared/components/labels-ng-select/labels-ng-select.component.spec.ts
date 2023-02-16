import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsNgSelectComponent } from './labels-ng-select.component';

describe('LabelsNgSelectComponent', () => {
  let component: LabelsNgSelectComponent;
  let fixture: ComponentFixture<LabelsNgSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelsNgSelectComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsNgSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
