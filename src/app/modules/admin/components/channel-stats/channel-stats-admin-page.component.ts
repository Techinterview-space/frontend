import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  MonitoredChannel,
  MonthlyStatsRunDto,
  RunMonthlyStatsResponse,
  UpdateMonitoredChannelRequest,
} from "@models/channel-stats.model";
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

  calculatingChannelId: number | null = null;
  sendDialogChannel: MonitoredChannel | null = null;
  sendDialogRuns: Array<MonthlyStatsRunDto> | null = null;
  sendDialogSelectedRunId: number | null = null;
  sendDialogLoading = false;
  sendInProgress = false;

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

  calculateStats(item: MonitoredChannel): void {
    if (this.calculatingChannelId != null) {
      return;
    }

    this.calculatingChannelId = item.id;

    this.service
      .calculateChannelStats(item.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.calculatingChannelId = null;
          if (response.errors.length > 0) {
            this.alert.warn("Расчет завершен с ошибками");
          } else {
            this.alert.success("Статистика рассчитана для " + item.channelName);
          }
        },
        error: () => {
          this.calculatingChannelId = null;
          this.alert.error("Ошибка при расчете статистики");
        },
      });
  }

  toggleActive(item: MonitoredChannel): void {
    const request: UpdateMonitoredChannelRequest = {
      channelName: item.channelName,
      discussionChatExternalId: item.discussionChatExternalId,
      isActive: !item.isActive,
    };

    this.service
      .updateChannel(item.id, request)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alert.success(
            item.isActive ? "Канал отключен" : "Канал включен",
          );
          this.loadChannels();
        },
        error: () => {
          this.alert.error("Ошибка при обновлении канала");
        },
      });
  }

  openSendDialog(item: MonitoredChannel): void {
    this.sendDialogChannel = item;
    this.sendDialogRuns = null;
    this.sendDialogSelectedRunId = null;
    this.sendDialogLoading = true;

    this.service
      .getChannelRuns(item.id, 3)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (runs) => {
          this.sendDialogRuns = runs;
          this.sendDialogLoading = false;
          if (runs.length > 0) {
            this.sendDialogSelectedRunId = runs[0].id;
          }
        },
        error: () => {
          this.alert.error("Ошибка при загрузке расчетов");
          this.closeSendDialog();
        },
      });
  }

  closeSendDialog(): void {
    this.sendDialogChannel = null;
    this.sendDialogRuns = null;
    this.sendDialogSelectedRunId = null;
    this.sendDialogLoading = false;
    this.sendInProgress = false;
  }

  sendSelectedRun(): void {
    if (this.sendDialogSelectedRunId == null) {
      return;
    }

    this.sendInProgress = true;

    this.service
      .sendStatsRun(this.sendDialogSelectedRunId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.sendInProgress = false;
          if (response.success) {
            this.alert.success("Обновление отправлено в канал");
            this.closeSendDialog();
          } else {
            this.alert.error(response.errorMessage ?? "Ошибка при отправке");
          }
        },
        error: () => {
          this.sendInProgress = false;
          this.alert.error("Ошибка при отправке обновления");
        },
      });
  }
}
