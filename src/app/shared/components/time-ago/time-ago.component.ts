import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-time-ago",
  templateUrl: "./time-ago.component.html",
  standalone: false,
})
export class TimeAgoComponent implements OnInit {
  @Input()
  date!: Date | string;

  @Input()
  css = "";

  timeAgoText: string = "";

  ngOnInit() {
    this.updateTimeAgo();
  }

  private updateTimeAgo() {
    const pastDate = new Date(this.date);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

    if (seconds < 60) {
      this.timeAgoText = "только что";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      this.timeAgoText = `${minutes} ${this.getPlural(minutes, ["минуту", "минуты", "минут"])} назад`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      this.timeAgoText = `${hours} ${this.getPlural(hours, ["час", "часа", "часов"])} назад`;
    } else if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      this.timeAgoText = `${days} ${this.getPlural(days, ["день", "дня", "дней"])} назад`;
    } else if (seconds < 31536000) {
      const months = Math.floor(seconds / 2592000);
      this.timeAgoText = `${months} ${this.getPlural(months, ["месяц", "месяца", "месяцев"])} назад`;
    } else {
      const years = Math.floor(seconds / 31536000);
      this.timeAgoText = `${years} ${this.getPlural(years, ["год", "года", "лет"])} назад`;
    }
  }

  private getPlural(value: number, forms: [string, string, string]): string {
    const mod10 = value % 10;
    const mod100 = value % 100;

    if (mod10 === 1 && mod100 !== 11) {
      return forms[0]; // singular (e.g., минута)
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return forms[1]; // few (e.g., минуты)
    } else {
      return forms[2]; // many (e.g., минут)
    }
  }
}
