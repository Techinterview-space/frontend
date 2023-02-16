import { TestBed } from '@angular/core/testing';

import { IsDesktopGuard } from './is-desktop.guard';

describe('IsDesktopGuard', () => {
  let guard: IsDesktopGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsDesktopGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
