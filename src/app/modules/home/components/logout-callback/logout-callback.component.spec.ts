import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mostUsedImports, testUtilStubs } from '@shared/test-utils';

import { LogoutCallbackComponent } from './logout-callback.component';

describe('LogoutCallbackComponent', () => {
  let component: LogoutCallbackComponent;
  let fixture: ComponentFixture<LogoutCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutCallbackComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
