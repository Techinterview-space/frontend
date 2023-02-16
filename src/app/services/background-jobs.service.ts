import { Injectable } from '@angular/core';
import { JobResult } from '@models/job-result';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class BackgroundJobsService {
    constructor(private readonly api: ApiService) {}

    monthlyTaxUserPaymentCalculation(): Observable<JobResult> {
        return this.api.get<JobResult>('/api/admin/jobs/monthly-tax-user-payment-calculation');
    }

    halfYearTaxUserPaymentCalculation(): Observable<JobResult> {
        return this.api.get<JobResult>('/api/admin/jobs/half-year-tax-user-payment-calculation');
    }
}
