import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperGradeLabelComponent } from './developer-grade-label.component';

describe('DeveloperGradeLabelComponent', () => {
  let component: DeveloperGradeLabelComponent;
  let fixture: ComponentFixture<DeveloperGradeLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperGradeLabelComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperGradeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
