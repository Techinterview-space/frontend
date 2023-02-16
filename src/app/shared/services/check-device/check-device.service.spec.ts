import { TestBed } from '@angular/core/testing';

import { CheckDeviceService } from './check-device.service';

describe('CheckDeviceService', () => {
  let service: CheckDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
