import { Injectable } from '@angular/core';
import { UserRole } from '@models/enums';
import { RoleGuardBase } from './role-guard.base';

@Injectable()
export class AdminGuard extends RoleGuardBase {
  protected roleToCheck(): UserRole {
    return UserRole.Admin;
  }
}
