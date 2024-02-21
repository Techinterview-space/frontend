import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from '@services/authorization.service';
import { ApplicationUserExtended } from '@models/extended';
import { TitleService } from '@services/title.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  templateUrl: './me.component.html'
})
export class MeComponent implements OnInit, OnDestroy {
  user: ApplicationUserExtended | null = null;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly auth: AuthService,
    private readonly titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.authorizationService
      .getMe()
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.user = new ApplicationUserExtended(user);
      });

    this.titleService.setTitle('My profile');
  }

  ngOnDestroy(): void {}
}
