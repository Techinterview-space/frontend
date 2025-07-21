import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingMessageSubscriptionsComponent } from './job-posting-message-subscriptions.component';

describe('JobPostingMessageSubscriptionsComponent', () => {
  let component: JobPostingMessageSubscriptionsComponent;
  let fixture: ComponentFixture<JobPostingMessageSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPostingMessageSubscriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostingMessageSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});