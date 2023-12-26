import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientStub } from './http-client.stub';
import { RouterStub } from './router-stub';
import { ActivatedRouteMock } from './mock-activated-route';
import { AuthService } from '@shared/services/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserRole } from '@models/enums';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { SpyLocation } from '@angular/common/testing';
import { TestApplicationUser } from './models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationUserExtended } from '@models/extended';
import { CheckDeviceService } from '@shared/services/check-device/check-device.service';
import { AuthSessionService } from '@shared/services/auth/auth.session.service';
import { SessionStorageWrapper } from '@shared/services/session-storage-wrapper.service';
import { ApiService } from '@services/api.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TitleService } from '@services/title.service';
import { CookieService } from 'ngx-cookie-service';
import { MockAuthService } from './mock-auth.service';
import { NgSelectModule } from '@ng-select/ng-select';

export * from './mock-activated-route';
export * from './mock-auth.service';
export * from './http-client.stub';
export * from './router-stub';

export const testUtilStubs = [
  { provide: HttpClient, useClass: HttpClientStub },
  { provide: Router, useClass: RouterStub },
  { provide: ActivatedRoute, useClass: ActivatedRouteMock },
  { provide: Location, useClass: SpyLocation }
];

export const mostUsedServices = [
  SessionStorageWrapper,
  AuthSessionService,
  { provide: AuthService, useClass: MockAuthService },
  AlertService,
  CheckDeviceService,
  ApiService,
  TitleService,
  CookieService
];

export const mostUsedImports = [
  BrowserModule,
  ReactiveFormsModule,
  FormsModule,
  SharedModule,
  BrowserAnimationsModule,
  RouterTestingModule,
  CommonModule,
  NgSelectModule,
  RouterModule
];

// tslint:disable-next-line: ban-types
export const spyOnCurrentUserServiceWithUser = (user: ApplicationUserExtended, spyOnFn: Function): AuthService => {
  const authService = TestBed.inject(AuthService);
  spyOnFn(authService, 'getCurrentUser').and.returnValue(of(user));
  return authService;
};

export const spyOnCurrentUserServiceWithUserId = (
  // tslint:disable-next-line: ban-types
  spyOnFn: Function,
  userId: number | null = null,
  role: UserRole = UserRole.Interviewer
): AuthService => {
  userId = userId != null ? userId : 1;
  const user = new ApplicationUserExtended(new TestApplicationUser(role, userId));
  return spyOnCurrentUserServiceWithUser(user, spyOnFn);
};
