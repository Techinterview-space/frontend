import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Organization } from '@models/organizations/organization.model';
import { InviteUserRequest } from '@services/organization-invitations.service';

export class InviteUserForm extends FormGroup {
    constructor(organization: Organization) {
        super({
            email: new FormControl(null, [Validators.required, Validators.email]),
            organizationId: new FormControl(organization.id, [Validators.required]),
        });
    }

    requestOrNull(): InviteUserRequest | null {
        if (!this.valid) {
            this.markAllAsTouched();
            return null;
        }

        return {
            email: this.value.email,
            organizationId: this.value.organizationId,
        };
    }
}
