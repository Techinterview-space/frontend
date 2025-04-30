import { Component } from "@angular/core";

interface NavbarLink {
  title: string;
  url: string;
}

interface NavbarDropdown {
  title: string;
  links: NavbarLink[];
}

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
  styleUrls: ["./admin-navbar.component.scss"],
  standalone: false,
})
export class AdminNavbarComponent {
  readonly showSearchForm = false;
  readonly dropdowns: NavbarDropdown[];

  constructor() {
    this.dropdowns = [
      {
        title: "Юзеры",
        links: [
          {
            title: "Все юзеры",
            url: "/admin/users",
          },
        ],
      },
      {
        title: "Шаблоны",
        links: [
          {
            title: "Все шаблоны",
            url: "/admin/interview-templates",
          },
        ],
      },
      {
        title: "Справочники",
        links: [
          {
            title: "Специальности",
            url: "/admin/professions",
          },
          {
            title: "Навыки",
            url: "/admin/skills",
          },
          {
            title: "Сферы деятельности",
            url: "/admin/work-industries",
          },
        ],
      },
      {
        title: "Анкеты зарплат",
        links: [
          {
            title: "Анкеты в статистике",
            url: "/admin/salaries",
          },
          {
            title: "Анкеты вне статистики",
            url: "/admin/salaries/not-in-stats",
          },
          {
            title: "Импортированные анкеты",
            url: "/admin/salaries/imported-salaries",
          },
        ],
      },
      {
        title: "Компании",
        links: [
          {
            title: "Все компании",
            url: "/admin/companies",
          },
          {
            title: "Отзывы на модерацию",
            url: "/admin/companies/reviews-to-approve",
          },
        ],
      },
      {
        title: "Telegram",
        links: [
          {
            title: "Использование бота",
            url: "/admin/telegram/bot-usages",
          },
          {
            title: "Подписчики бота",
            url: "/admin/telegram/user-settings",
          },
          {
            title: "Подписки на регулярный апдейт по зарплатам",
            url: "/admin/telegram/stat-data-change-subscriptions",
          },
        ],
      },
      {
        title: "Инструменты",
        links: [
          {
            title: "Общее",
            url: "/admin/tools/background-jobs",
          },
          {
            title: "Курсы валют",
            url: "/admin/tools/currencies",
          },
          {
            title: "QR код",
            url: "/admin/tools/generate-qr",
          },
        ],
      },
    ];
  }
}
