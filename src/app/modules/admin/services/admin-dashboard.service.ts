import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "@services/api.service";
import { ItemsPerDayChartData } from "@shared/value-objects/items-per-day-chart-data";

export interface AverageRatingData {
  count: number;
  averageRating: number;
}

export interface AdminDashboardResponse {
  averageRatingData: AverageRatingData;
  totalSalaries: number;
  totalCompanyReviews: number;
  userEmailsForLastDays: ItemsPerDayChartData;
  reviewLikesForLastTenDays: ItemsPerDayChartData;
  reviewsForLastTenDays: ItemsPerDayChartData;
}

@Injectable({
  providedIn: "root",
})
export class AdminDashboardService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/admin/dashboard/`;
  }

  getDashboard(): Observable<AdminDashboardResponse> {
    return this.api.get<AdminDashboardResponse>(this.apiUrl);
  }
}
