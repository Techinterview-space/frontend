import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApplicationUser } from "@models/application-user";
import { UpdateUserRolesRequest } from "@services/user-admin.service";

export class UserRolesEditForm extends FormGroup {
  constructor(user: ApplicationUser) {
    super({
      userId: new FormControl(user.id, [Validators.required]),
      roles: new FormControl(user.roles, [Validators.required]),
    });
  }

  requestOrNull(): UpdateUserRolesRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      id: this.value.userId,
      roles: this.value.roles,
    };
  }
}
