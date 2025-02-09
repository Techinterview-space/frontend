import { SessionStorageWrapper } from "../session-storage-wrapper.service";
import { IdToken, User } from "@auth0/auth0-angular";
import Assertion from "@shared/validation/assertion";
import { Injectable } from "@angular/core";
import { ApplicationUser } from "@models/application-user";

@Injectable()
export class AuthSessionService {
  public static readonly SessionLifetimeSeconds = 43200; // 12 hours

  private readonly authorizationTimestampSessionKey = "CurrentUser_Timestamp";
  private readonly authorizationStorageSessionKey = "CurrentUser_AuthInfo";
  private readonly applicationUserStorageSessionKey = "CurrentUser_AppUserInfo";

  constructor(private readonly session: SessionStorageWrapper) {}

  set auth(user: IdToken | null) {
    Assertion.notNull(user, "user");
    this.session.setItem(this.authorizationStorageSessionKey, user);
    this.session.setItem(this.authorizationTimestampSessionKey, Date.now());
  }

  get auth(): IdToken | null {
    const user = this.session.getItem<IdToken>(
      this.authorizationStorageSessionKey,
    );
    if (user == null || this.sessionExpired) {
      return null;
    }

    return user ?? null;
  }

  set applicationUser(user: ApplicationUser | null) {
    Assertion.notNull(user, "user");
    this.session.setItem(this.applicationUserStorageSessionKey, user);
  }

  get applicationUser(): ApplicationUser | null {
    return this.session.getItem(this.applicationUserStorageSessionKey);
  }

  get timestamp(): Date | null {
    const timestamp = this.session.getItem<number>(
      this.authorizationTimestampSessionKey,
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
