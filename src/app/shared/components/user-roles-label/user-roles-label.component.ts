import { Component, Input, OnInit } from "@angular/core";
import { UserRole } from "@models/enums";

interface UserRoleLabel {
  role: UserRole;
  label: string;
  styleCss: string;
}

@Component({
    selector: "app-user-roles-label",
    templateUrl: "./user-roles-label.component.html",
    standalone: false
})
export class UserRolesLabelComponent implements OnInit {
  @Input()
  userRoles: Array<UserRole> | null = null;

  roles: Array<UserRoleLabel> = [];

  label = "";
  styleCss = "";

  ngOnInit(): void {
    if (this.userRoles == null) {
      this.roles.push({
        role: UserRole.None,
        label: "None",
        styleCss: "bg-light text-dark",
      });
      return;
    }

    this.roles = this.userRoles.map((role) => {
      let styleCss = "";
      switch (role) {
        case UserRole.Interviewer:
          styleCss = "bg-info text-dark";
          break;
        case UserRole.Admin:
          styleCss = "bg-warning text-dark";
          break;
        default:
          styleCss = "bg-light text-dark";
          break;
      }

      return {
        role,
        label: UserRole[role],
        styleCss: styleCss,
      };
    });
  }
}
