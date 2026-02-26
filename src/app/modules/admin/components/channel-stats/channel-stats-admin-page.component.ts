import { Component, OnDestroy, OnInit } from "@angular/core";
import { MonitoredChannel, MonthlyStatsRunDto, RunMonthlyStatsResponse } from "@models/channel-stats.model";
import { ChannelStatsAdminService } from "@services/channel-stats-admin.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { MonitoredChannelForm } from "./monitored-channel-form";

@Component({
  selector: "app-channel-stats-admin-page",
  templateUrl: "./channel-stats-admin-page.component.html",
  styleUrls: ["./channel-stats-admin-page.component.scss"],
  standalone: false,
})
export class ChannelStatsAdminPageComponent implements OnInit, OnDestroy {
  channels: Array<MonitoredChannel> | null = null;
  editForm: MonitoredChannelForm | null = null;
  itemToEdit: MonitoredChannel | null = null;

  runInProgress = false;
  lastRunResponse: RunMonthlyStatsResponse | null = null;

  resultsYear: number;
  resultsMonth: number;
  statsResults: Array<MonthlyStatsRunDto> | null = null;
  resultsLoading = false;

  constructor(
    private readonly service: ChannelStatsAdminService,
    private readonly title: TitleService,
    private readonly alert: AlertService,
  ) {
    this.title.setTitle("Статистика каналов");

    const now = new Date();
    this.resultsYear = now.getFullYear();
    this.resultsMonth = now.getMonth() + 1;
  }

  ngOnInit(): void {
    this.loadChannels();
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  loadChannels(): void {
    this.channels = null;
    this.service
      .getChannels()
      .pipe(untilDestroyed(this))
      .subscribe((channels) => {
        this.channels = channels;
      });
  }

  create(): void {
    this.itemToEdit = null;
    this.editForm = new MonitoredChannelForm(null);
  }

  edit(item: MonitoredChannel): void {
    this.itemToEdit = item;
    this.editForm = new MonitoredChannelForm(item);
  }

  onEditFormSubmit(): void {
    if (this.editForm == null) {
      return;
    }

    this.editForm.markAllAsTouched();

    if (this.itemToEdit != null) {
      const request = this.editForm.getUpdateRequestOrNull();
      if (request == null) {
        this.alert.error("Некорректные данные");
        return;
      }

      this.service
        .updateChannel(this.itemToEdit.id, request)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.alert.success("Канал обновлен");
          this.editForm = null;
          this.itemToEdit = null;
          this.loadChannels();
        });

      return;
    }

    const request = this.editForm.getCreateRequestOrNull();
    if (request == null) {
      this.alert.error("Некорректные данные");
      return;
    }

    this.service
      .createChannel(request)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Канал создан");
        this.editForm = null;
        this.loadChannels();
      });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
    this.itemToEdit = null;
  }

  runStats(): void {
    this.runInProgress = true;
    this.lastRunResponse = null;

    this.service
      .runMonthlyStats()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.lastRunResponse = response;
          this.runInProgress = false;

          if (response.errors.length > 0) {
            this.alert.warn(
              `Завершено с ${response.errors.length} ошибками`,
            );
          } else {
            this.alert.success(
              `Статистика рассчитана для ${response.runs.length} каналов`,
            );
          }
        },
        error: () => {
          this.runInProgress = false;
          this.alert.error("Ошибка при расчете статистики");
        },
      });
  }

  loadResults(): void {
    this.resultsLoading = true;
    this.statsResults = null;

    this.service
      .getResults(this.resultsYear, this.resultsMonth)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (results) => {
          this.statsResults = results;
          this.resultsLoading = false;
        },
        error: () => {
          this.resultsLoading = false;
          this.alert.error("Ошибка при загрузке результатов");
        },
      });
  }
}
