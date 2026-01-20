import { Component, OnDestroy } from "@angular/core";
import { TitleService } from "@services/title.service";
import {
  AdminEmailService,
  SendCustomEmailRequest,
} from "@services/admin-email.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./send-email-page.component.html",
  styleUrls: ["./send-email-page.component.scss"],
  standalone: false,
})
export class SendEmailPageComponent implements OnDestroy {
  emailRequest: SendCustomEmailRequest = {
    to: "",
    cc: "",
    from: "",
    subject: "",
    htmlBody: "",
  };

  isSending = false;

  constructor(
    private readonly titleService: TitleService,
    private readonly adminEmailService: AdminEmailService,
    private readonly alertService: AlertService,
  ) {
    this.titleService.setTitle("Send Test Email");
  }

  sendEmail(): void {
    if (!this.isFormValid()) {
      this.alertService.error("Please fill in all required fields");
      return;
    }

    this.isSending = true;

    this.adminEmailService
      .sendEmail(this.emailRequest)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.isSending = false;
          if (response.success) {
            this.alertService.success(response.message);
          } else {
            this.alertService.error(response.message);
          }
        },
        error: (err) => {
          this.isSending = false;
          this.alertService.error(
            "Failed to send email: " + (err.message || "Unknown error"),
          );
        },
      });
  }

  isFormValid(): boolean {
    return (
      this.emailRequest.to.trim() !== "" &&
      this.emailRequest.from.trim() !== "" &&
      this.emailRequest.subject.trim() !== "" &&
      this.emailRequest.htmlBody.trim() !== ""
    );
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
