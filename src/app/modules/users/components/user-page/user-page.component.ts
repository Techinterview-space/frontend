import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApplicationUser } from "@models/application-user";
import { TitleService } from "@services/title.service";
import { UsersService } from "@services/users.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"],
  standalone: false,
})
export class UserPageComponent implements OnInit, OnDestroy {
  user: ApplicationUser | null = null;

  private readonly activatedRoute: ActivatedRouteExtended;

  constructor(
    private readonly service: UsersService,
    private readonly titleService: TitleService,
    activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.activatedRoute
      .getIdFromRoute()
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.service
          .byId(id!)
          .pipe(untilDestroyed(this))
          .subscribe((user) => {
            this.user = user;
            this.titleService.setTitle("Профиль пользователя " + user.email);
          });
      });
  }

  ngOnDestroy(): void {}
}
