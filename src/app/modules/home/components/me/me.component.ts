import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthorizationService } from "@services/authorization.service";
import { ApplicationUserExtended } from "@models/extended";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { AuthService } from "@shared/services/auth/auth.service";
import { TotpService } from "@services/totp.service";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { UserRole } from "@models/enums";

@Component({
  templateUrl: "./me.component.html",
  standalone: false,
})
export class MeComponent implements OnInit, OnDestroy {
  user: ApplicationUserExtended | null = null;
  mfaQrCodeImage: string | null = null;
  confirmDisablingMfaMessage: DialogMessage<ConfirmMsg> | null = null;
  showEnableMfaBlock = false;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly titleService: TitleService,
    private readonly totpService: TotpService,
  ) {
    this.titleService.setTitle("Мой профиль");
  }

  ngOnInit(): void {
    this.reloadUser();
  }

  openMfaSetupDialog(): void {
    if (this.user?.isMfaEnabled) {
      return;
    }

    this.totpService
      .enableMfa()
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        this.mfaQrCodeImage =
          "data:image/jpg;base64," + response.totpSetupQRBase64;
      });
  }

  openDisableMfaDialog(): void {
    this.confirmDisablingMfaMessage = new DialogMessage(
      new ConfirmMsg(
        "Отключить мультфакторную авторизацию",
        "Вы уверены?",
        () => {
          this.totpService
            .disableMfa()
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.confirmDisablingMfaMessage = null;
              this.reloadUser();
            });
        },
      ),
    );
  }

  onQrModalDlgClose(): void {
    this.mfaQrCodeImage = null;
    this.reloadUser();
  }

  ngOnDestroy(): void {}

  private reloadUser(): void {
    this.authorizationService
      .getMe()
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.user = new ApplicationUserExtended(user);
        this.showEnableMfaBlock = this.user.hasRole(UserRole.Admin);
      });
  }
}
