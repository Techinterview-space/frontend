import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "@services/api.service";

export interface AverageRatingData {
  count: number;
  averageRating: number;
}

export interface AdminDashboardResponse {
  averageRatingData: AverageRatingData;
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
