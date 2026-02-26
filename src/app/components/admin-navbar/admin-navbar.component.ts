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
        title: "Данные",
        links: [
          {
            title: "Пользователи",
            url: "/admin/users",
            isExternal: false,
          },
          {
            title: "Все шаблоны",
            url: "/admin/interview-templates",
            isExternal: false,
          },
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
        title: "Зарплаты",
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
          {
            title: "График исторических данных",
            url: "/admin/salaries/historical-data-templates",
            isExternal: false,
          },
          {
            title: "Страница зарплат для ботов",
            url: "/salaries/overview",
            isExternal: false,
          },
          {
            title: "Опросы",
            url: "/admin/surveys",
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
        title: "Techinterview Bot",
        links: [
          {
            title: "Статистика каналов",
            url: "/admin/channel-stats",
            isExternal: false,
          },
          {
            title: "Настройки ботов",
            url: "/admin/telegram/bot-configurations",
            isExternal: false,
          },
          {
            title: "Админы бота",
            url: "/admin/telegram/user-settings",
            isExternal: false,
          },
          {
            title: "Подписки на зарплаты",
            url: "/admin/telegram/stat-data-change-subscriptions",
            isExternal: false,
          },
          {
            title: "Подписки на отзывы",
            url: "/admin/telegram/reviews-stat-subscriptions",
            isExternal: false,
          },
          {
            title: "Подписки на вакансии",
            url: "/admin/telegram/job-posting-message-subscriptions",
            isExternal: false,
          },
        ],
      },
      {
        title: "Github Profile Bot",
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
        title: "AI",
        links: [
          {
            title: "OpenAI промпты",
            url: "/admin/openai-prompts",
            isExternal: false,
          },
          {
            title: "OpenAI API usage",
            url: "https://platform.openai.com/usage",
            isExternal: true,
          },
          {
            title: "Claude API usage",
            url: "https://console.anthropic.com/usage",
            isExternal: true,
          },
        ],
      },
      {
        title: "Инструменты",
        links: [
          {
            title: "Настройки",
            url: "/admin/tools/background-jobs",
            isExternal: false,
          },
          {
            title: "Отправка email",
            url: "/admin/tools/send-email",
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
            title: "M2M Clients",
            url: "/admin/m2m-clients",
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
