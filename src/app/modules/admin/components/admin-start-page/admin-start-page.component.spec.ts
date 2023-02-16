import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStartPageComponent } from './admin-start-page.component';

describe('AdminStartPageComponent', () => {
  let component: AdminStartPageComponent;
  let fixture: ComponentFixture<AdminStartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStartPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
