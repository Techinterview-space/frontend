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
        title: "Зарплаты",
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
            title: "Тренд добавления анкет",
            url: "/admin/salaries/salaries-adding-trend-chart",
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
        ],
      },
      {
        title: "Инструменты",
        links: [
          {
            title: "Хз как назвать",
            url: "/admin/background-jobs",
          },
        ],
      },
    ];
  }
}
