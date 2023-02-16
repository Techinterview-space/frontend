import { Component, Input } from '@angular/core';
import { ApplicationUser } from '@models/application-user';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html'
})
export class UserProfilePageComponent {
  @Input()
  user: ApplicationUser | null = null;
}
