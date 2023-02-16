import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorizedErrorComponent } from './not-authorized-error.component';

describe('NotAuthorizedErrorComponent', () => {
  let component: NotAuthorizedErrorComponent;
  let fixture: ComponentFixture<NotAuthorizedErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotAuthorizedErrorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAuthorizedErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
