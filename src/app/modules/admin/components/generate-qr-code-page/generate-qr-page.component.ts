import { Component, OnDestroy } from "@angular/core";
import { TitleService } from "@services/title.service";
import { AdminToolsService } from "@services/admin-tools.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
    templateUrl: "./generate-qr-page.component.html",
    styleUrls: ["./generate-qr-page.component.scss"],
    standalone: false
})
export class GenerateQrPageComponent implements OnDestroy {
  shoQrCodeDialog = false;
  qrCodeSource: string | null = null;
  generatedQRBase64: string | null = null;

  constructor(
    private readonly titleService: TitleService,
    private readonly adminToolsService: AdminToolsService
  ) {
    this.titleService.setTitle("Генерация QR-кода");
  }

  generateQrCode(): void {
    if (this.qrCodeSource == null) {
      return;
    }

    this.adminToolsService
      .generateQR(this.qrCodeSource)
      .pipe(untilDestroyed(this))
      .subscribe((r) => {
        this.generatedQRBase64 = "data:image/jpg;base64," + r.imageBase64;
        this.shoQrCodeDialog = true;
      });
  }

  onQrModalDlgClose(): void {
    this.shoQrCodeDialog = false;
    this.generatedQRBase64 = null;
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
