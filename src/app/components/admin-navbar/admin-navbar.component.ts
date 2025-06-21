import { Component } from "@angular/core";

interface NavbarLink {
  title: string;
  url: string;
  isExternal: boolean;
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
            isExternal: false,
          },
        ],
      },
      {
        title: "Шаблоны",
        links: [
          {
            title: "Все шаблоны",
            url: "/admin/interview-templates",
            isExternal: false,
          },
        ],
      },
      {
        title: "Справочники",
        links: [
          {
            title: "Специальности",
            url: "/admin/professions",
            isExternal: false,
          },
          {
            title: "Навыки",
            url: "/admin/skills",
            isExternal: false,
          },
          {
            title: "Сферы деятельности",
            url: "/admin/work-industries",
            isExternal: false,
          },
        ],
      },
      {
        title: "Анкеты зарплат",
        links: [
          {
            title: "Анкеты в статистике",
            url: "/admin/salaries",
            isExternal: false,
          },
          {
            title: "Анкеты вне статистики",
            url: "/admin/salaries/not-in-stats",
            isExternal: false,
          },
          {
            title: "Импортированные анкеты",
            url: "/admin/salaries/imported-salaries",
            isExternal: false,
          },
        ],
      },
      {
        title: "Компании",
        links: [
          {
            title: "Все компании",
            url: "/admin/companies",
            isExternal: false,
          },
          {
            title: "Отзывы на модерацию",
            url: "/admin/companies/reviews-to-approve",
            isExternal: false,
          },
        ],
      },
      {
        title: "Telegram",
        links: [
          {
            title: "Использование бота",
            url: "/admin/telegram/bot-usages",
            isExternal: false,
          },
          {
            title: "Подписчики бота",
            url: "/admin/telegram/user-settings",
            isExternal: false,
          },
          {
            title: "Подписки на регулярный апдейт по зарплатам",
            url: "/admin/telegram/stat-data-change-subscriptions",
            isExternal: false,
          },
          {
            title: "Статистика ответов в Inline",
            url: "/admin/telegram/inline-replies-stats",
            isExternal: false,
          },
        ],
      },
      {
        title: "Github bot",
        links: [
          {
            title: "Запрошенные профили",
            url: "/admin/github/profiles",
            isExternal: false,
          },
          {
            title: "Чаты",
            url: "/admin/github/chats",
            isExternal: false,
          },
          {
            title: "Джобы",
            url: "/admin/github/processing-jobs",
            isExternal: false,
          },
        ],
      },
      {
        title: "Инструменты",
        links: [
          {
            title: "Общее",
            url: "/admin/tools/background-jobs",
            isExternal: false,
          },
          {
            title: "Курсы валют",
            url: "/admin/tools/currencies",
            isExternal: false,
          },
          {
            title: "QR код",
            url: "/admin/tools/generate-qr",
            isExternal: false,
          },
          {
            title: "Kibana",
            url: "https://kibana.techinterview.space",
            isExternal: true,
          },
        ],
      },
    ];
  }
}
