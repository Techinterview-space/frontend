import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import {
  CreateMonitoredChannelRequest,
  MonitoredChannel,
  MonthlyStatsRunDto,
  RunMonthlyStatsResponse,
  SendStatsRunResponse,
  UpdateMonitoredChannelRequest,
} from "@models/channel-stats.model";

@Injectable()
export class ChannelStatsAdminService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = "/api/admin/channel-stats";
  }

  getChannels(): Observable<Array<MonitoredChannel>> {
    return this.api.get<Array<MonitoredChannel>>(this.apiUrl + "/channels");
  }

  createChannel(
    request: CreateMonitoredChannelRequest,
  ): Observable<MonitoredChannel> {
    return this.api.post<MonitoredChannel>(
      this.apiUrl + "/channels",
      request,
    );
  }

  updateChannel(
    id: number,
    request: UpdateMonitoredChannelRequest,
  ): Observable<MonitoredChannel> {
    return this.api.put<MonitoredChannel>(
      this.apiUrl + "/channels/" + id,
      request,
    );
  }

  runMonthlyStats(): Observable<RunMonthlyStatsResponse> {
    return this.api.post<RunMonthlyStatsResponse>(this.apiUrl + "/run");
  }

  getResults(
    year: number,
    month: number,
  ): Observable<Array<MonthlyStatsRunDto>> {
    return this.api.get<Array<MonthlyStatsRunDto>>(
      this.apiUrl + "/results",
      {
        params: {
          year: year.toString(),
          month: month.toString(),
        },
      },
    );
  }

  calculateChannelStats(
    channelId: number,
  ): Observable<RunMonthlyStatsResponse> {
    return this.api.post<RunMonthlyStatsResponse>(
      this.apiUrl + "/channels/" + channelId + "/calculate",
    );
  }

  getChannelRuns(
    channelId: number,
    take: number = 3,
  ): Observable<Array<MonthlyStatsRunDto>> {
    return this.api.get<Array<MonthlyStatsRunDto>>(
      this.apiUrl + "/channels/" + channelId + "/runs",
      {
        params: {
          take: take.toString(),
        },
      },
    );
  }

  sendStatsRun(runId: number): Observable<SendStatsRunResponse> {
    return this.api.post<SendStatsRunResponse>(
      this.apiUrl + "/runs/" + runId + "/send",
    );
  }
}
