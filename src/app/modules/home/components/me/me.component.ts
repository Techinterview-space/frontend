import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthorizationService } from "@services/authorization.service";
import { ApplicationUserExtended } from "@models/extended";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { TotpService } from "@services/totp.service";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { UserRole } from "@models/enums";
import { SalaryTableItem } from "./salary-table-item";
import { UserSalariesService } from "@services/user-salaries.service";
import { LabelEntityDto } from "@services/label-entity.model";

@Component({
  templateUrl: "./me.component.html",
  styleUrls: ["./me.component.scss"],
  standalone: false,
})
export class MeComponent implements OnInit, OnDestroy {
  user: ApplicationUserExtended | null = null;
  mfaQrCodeImage: string | null = null;
  confirmDisablingMfaMessage: DialogMessage<ConfirmMsg> | null = null;
  showEnableMfaBlock = false;

  mySalaries: Array<SalaryTableItem> = [];
  skills: Array<LabelEntityDto> = [];
  industries: Array<LabelEntityDto> = [];
  professions: Array<LabelEntityDto> = [];

  blurTable = true;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly titleService: TitleService,
    private readonly totpService: TotpService,
    private readonly salariesService: UserSalariesService,
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

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // Required for untilDestroyed
  }

  toggleBlurTable(): void {
    this.blurTable = !this.blurTable;
  }

  private reloadUser(): void {
    this.authorizationService
      .getMe()
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.user = new ApplicationUserExtended(user);
        this.showEnableMfaBlock = this.user.hasRole(UserRole.Admin);

        if (!this.showEnableMfaBlock) {
          if (
            this.professions.length === 0 ||
            this.skills.length === 0 ||
            this.industries.length === 0
          ) {
            this.salariesService
              .selectBoxItems()
              .pipe(untilDestroyed(this))
              .subscribe((x) => {
                this.skills = x.skills;
                this.industries = x.industries;
                this.professions = x.professions;

                this.reloadSalaries();
              });
          }
        } else {
          this.reloadSalaries();
        }
      });
  }

  private reloadSalaries(): void {
    this.authorizationService
      .getMySalaries()
      .pipe(untilDestroyed(this))
      .subscribe((salaries) => {
        this.mySalaries = salaries.map(
          (s) =>
            new SalaryTableItem(
              s,
              this.professions,
              this.skills,
              this.industries,
            ),
        );
      });
  }
}
