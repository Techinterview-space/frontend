import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@shared/services/auth/auth.service';
import { SpinnerService } from '@shared/services/spinners/spinner-service';
import { SharedModule } from '@shared/shared.module';
import { MockAuthService, testUtilStubs } from '@shared/test-utils';
import { CookieService } from 'ngx-cookie-service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [NavbarComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }, ...testUtilStubs, CookieService, SpinnerService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
