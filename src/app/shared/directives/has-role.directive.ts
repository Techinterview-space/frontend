import {
  Input,
  Directive,
  ViewContainerRef,
  TemplateRef,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { AuthService } from "@shared/services/auth/auth.service";
import UserRoleParser from "@shared/value-objects/user-role-parser";
import { ApplicationUserExtended } from "@models/extended";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Directive({
    selector: "[appHasRole]",
    standalone: false
})
// Copied from https://blog.strongbrew.io/display-a-component-based-on-role/
export class HasRoleDirective implements OnInit, OnDestroy {
  // the role the user must have.
  @Input("appHasRole") role: string | null = null;

  isVisible = false;

  /**
   * @param viewContainerRef - the location where we need to render the templateRef
   * @param templateRef - the templateRef to be potentially rendered
   * @param rolesService - will give us access to the roles a user has
   */
  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((currentUser) => {
      this.setPropertiesBasedOnUser(currentUser);
    });

    this.authService.loggedIn$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.setPropertiesBasedOnUser(user);
    });
  }

  private setPropertiesBasedOnUser(
    currentUser: ApplicationUserExtended | null
  ): void {
    if (currentUser == null) {
      this.clear();
      return;
    }

    const role = new UserRoleParser(this.role).get();
    // If the user has the role needed to
    // render this component we can add it
    if (currentUser.hasRole(role)) {
      // If it is already visible (which can happen if
      // his roles changed) we do not need to add it a second time
      if (!this.isVisible) {
        // We update the `isVisible` property and add the
        // templateRef to the view using the
        // 'createEmbeddedView' method of the viewContainerRef
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    } else {
      // If the user does not have the role,
      // we update the `isVisible` property and clear
      // the contents of the viewContainerRef
      this.isVisible = false;
      this.clear();
    }
  }

  private clear(): void {
    this.viewContainerRef.clear();
  }

  ngOnDestroy(): void {}
}
