import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthorizationService } from "@services/authorization.service";
import { TitleService } from "@services/title.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./unsubscribe-me.component.html",
  styleUrls: ["./unsubscribe-me.component.scss"],
  standalone: false,
})
export class UnsibscribeMeComponent implements OnInit, OnDestroy {
  private activatedRoute: ActivatedRouteExtended | null = null;

  constructor(
    private readonly authorizationService: AuthorizationService,
    route: ActivatedRoute,
    private readonly titleService: TitleService,
  ) {
    this.activatedRoute = new ActivatedRouteExtended(route);
    this.titleService.setTitle("Отписка от рассылок");
  }

  ngOnInit(): void {
    if (!this.activatedRoute) {
      return;
    }

    this.activatedRoute
      .getQueryParam("token")
      .pipe(untilDestroyed(this))
      .subscribe((token) => {
        if (token) {
          this.authorizationService
            .unsubscribeMe(token)
            .pipe(untilDestroyed(this))
            .subscribe();
        } else {
          console.error("Token is required");
        }
      });
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
