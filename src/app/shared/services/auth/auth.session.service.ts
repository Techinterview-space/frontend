import { SessionStorageWrapper } from "../session-storage-wrapper.service";
import Assertion from "@shared/validation/assertion";
import { Injectable } from "@angular/core";
import { ApplicationUser } from "@models/application-user";

export interface AuthInfo {
  accessToken: string;
  expiresAt: number;
}

@Injectable()
export class AuthSessionService {
  public static readonly SessionLifetimeSeconds = 43200; // 12 hours

  private readonly authorizationTimestampSessionKey = "CurrentUser_Timestamp";
  private readonly authorizationStorageSessionKey = "CurrentUser_AuthInfo";
  private readonly applicationUserStorageSessionKey = "CurrentUser_AppUserInfo";

  constructor(private readonly session: SessionStorageWrapper) {}

  set auth(authInfo: AuthInfo | null) {
    if (authInfo) {
      Assertion.notNull(authInfo, "authInfo");
      this.session.setItem(this.authorizationStorageSessionKey, authInfo);
      this.session.setItem(this.authorizationTimestampSessionKey, Date.now());
    } else {
      this.session.removeItem(this.authorizationStorageSessionKey);
      this.session.removeItem(this.authorizationTimestampSessionKey);
    }
  }

  get auth(): AuthInfo | null {
    const authInfo = this.session.getItem<AuthInfo>(
      this.authorizationStorageSessionKey
    );
    if (authInfo == null || this.sessionExpired) {
      return null;
    }

    return authInfo ?? null;
  }

  set applicationUser(user: ApplicationUser | null) {
    if (user) {
      Assertion.notNull(user, "user");
      this.session.setItem(this.applicationUserStorageSessionKey, user);
    } else {
      this.session.removeItem(this.applicationUserStorageSessionKey);
    }
  }

  get applicationUser(): ApplicationUser | null {
    return this.session.getItem(this.applicationUserStorageSessionKey);
  }

  get timestamp(): Date | null {
    const timestamp = this.session.getItem<number>(
      this.authorizationTimestampSessionKey
    );
    if (timestamp != null) {
      return new Date(timestamp);
    }

    return null;
  }

  get sessionAliveSeconds(): number {
    const timestamp = this.timestamp;
    if (timestamp == null) {
      return 0;
    }

    return (Date.now() - timestamp.getTime()) / 1000;
  }

  get sessionExpired(): boolean {
    return (
      this.sessionAliveSeconds >= AuthSessionService.SessionLifetimeSeconds
    );
  }

  clear(): void {
    this.session.removeItem(this.authorizationStorageSessionKey);
    this.session.removeItem(this.applicationUserStorageSessionKey);
    this.session.removeItem(this.authorizationTimestampSessionKey);
  }
}
