import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { Router } from '@angular/router';
import { RouterStub } from '@shared/test-utils/router-stub';
import { SharedModule } from '@shared/shared.module';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [AlertComponent],
      providers: [AlertService, { provide: Router, useClass: RouterStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
