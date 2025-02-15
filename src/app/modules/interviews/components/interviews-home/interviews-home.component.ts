import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApplicationUserExtended } from "@models/extended";
import { TitleService } from "@services/title.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { SpinnerService } from "@shared/services/spinners/spinner-service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

interface ImageHint {
  background: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  showPreloader: boolean;
}

@Component({
  selector: "app-interviews-home",
  templateUrl: "./interviews-home.component.html",
  styleUrls: ["./interviews-home.component.scss"],
  standalone: false,
})
export class InterviewsHomeComponent implements OnInit, OnDestroy {
  showHomePage = false;
  getStartedButtonTitle = "Начать";
  get showLoginButton(): boolean {
    return this.currentUser == null;
  }

  images: Array<ImageHint> = [];

  private currentUser: ApplicationUserExtended | null = null;

  constructor(
    private readonly titleService: TitleService,
    private readonly authService: AuthService,
    private readonly spinner: SpinnerService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.titleService.resetTitle();
    this.authService
      .getCurrentUser()
      .pipe(untilDestroyed(this))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        if (currentUser != null) {
          this.getStartedButtonTitle = "К моим заметкам";
        }
      });

    this.images = [
      {
        background: "bg-white",
        title: "Ведите заметки во время собеседования",
        subtitle:
          "Мы сохраним ваши заметки. Никто не сможет их посмотреть, кроме вас.",
        imageSrc:
          "https://techinterview.fra1.cdn.digitaloceanspaces.com/gif/conduct_interview_main_page.gif",
        imageAlt: "Conduct the interview GIF",
        showPreloader: true,
      },
      {
        background: "",
        title: "Делитесь фидбеком",
        subtitle:
          "Вы можете поделиться фидбеком как markdown-документом. А также экспортнуть и в PDF.",
        imageSrc:
          "https://techinterview.fra1.cdn.digitaloceanspaces.com/gif/share_the_interview.gif",
        imageAlt: "Share the interview GIF",
        showPreloader: true,
      },
      {
        background: "bg-white",
        title: "Создавайте шаблоны",
        subtitle:
          "Создайте шаблон для интервью с часто задаваемыми вопросами. А если вы хотите поделиться шаблоном, то можете сделать его публичным.",
        imageSrc:
          "https://techinterview.fra1.cdn.digitaloceanspaces.com/gif/create_templates_main_page.gif",
        imageAlt: "Create interview templates GIF",
        showPreloader: true,
      },
      {
        background: "",
        title: "Используйте шаблоны для интервью",
        subtitle:
          "Вы сможете быстро перенести вопросы на интервью с ваших личных шаблонов и публичных тоже.",
        imageSrc:
          "https://techinterview.fra1.cdn.digitaloceanspaces.com/gif/use_templates_for_your_interview.gif",
        imageAlt: "Use templates for your interviews GIF",
        showPreloader: true,
      },
    ];
  }

  showImage(hint: ImageHint): void {
    hint.showPreloader = false;
  }

  getStarted(): void {
    if (this.currentUser == null) {
      this.spinner.showTimer();
      this.authService.login().pipe(untilDestroyed(this)).subscribe();
      return;
    }

    this.router.navigateByUrl(this.getRedirectUrl());
  }

  ngOnDestroy(): void {
    // ignored
  }

  private getRedirectUrl(): string {
    return "/interviews/my";
  }
}
