import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import {
  Company,
  CompanyEmploymentType,
  CompanyReview,
} from "@models/companies.model";
import { PageParams } from "@models/page-params";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { PaginatedList } from "@models/paginated-list";

export interface CompaniesSearchParams extends PageParams {
  searchQuery: string | null;
  withRating: boolean;
}

export interface CompanyEditRequest {
  name: string;
  description: string;
  links: string[];
  logoUrl: string;
}

export interface CompanyReviewCreateRequest {
  cultureAndValues: number;
  codeQuality: number;
  workLifeBalance: number;
  compensationAndBenefits: number;
  careerOpportunities: number;
  management: number;
  pros: string;
  cons: string;
  iWorkHere: boolean;
  userEmployment: CompanyEmploymentType;
}

@Injectable()
export class CompaniesService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/companies/`;
  }

  byId(id: string): Observable<Company> {
    return this.api.get<Company>(this.apiUrl + id);
  }

  update(id: string, model: CompanyEditRequest): Observable<void> {
    return this.api.post(this.apiUrl + id, model);
  }

  create(model: CompanyEditRequest): Observable<void> {
    return this.api.post(this.apiUrl, model);
  }

  delete(id: string): Observable<void> {
    return this.api.delete(this.apiUrl + id);
  }

  all(pageParams: CompaniesSearchParams): Observable<PaginatedList<Company>> {
    return this.api.get<PaginatedList<Company>>(
      this.apiUrl + "?" + new ConvertObjectToHttpParams(pageParams).get(),
    );
  }

  reviewsToApprove(): Observable<CompanyReview[]> {
    return this.api.get<CompanyReview[]>(this.apiUrl + "reviews/to-approve");
  }

  addCompanyReview(
    companyId: string,
    review: CompanyReviewCreateRequest,
  ): Observable<void> {
    return this.api.post(this.apiUrl + companyId + "/reviews", review);
  }

  approveReview(companyId: string, reviewId: string): Observable<void> {
    return this.api.post(
      this.apiUrl + companyId + "/reviews/" + reviewId + "/approve",
      {},
    );
  }

  outdateReview(companyId: string, reviewId: string): Observable<void> {
    return this.api.post(
      this.apiUrl + companyId + "/reviews/" + reviewId + "/outdate",
      {},
    );
  }

  deleteReview(companyId: string, reviewId: string): Observable<void> {
    return this.api.delete(this.apiUrl + companyId + "/reviews/" + reviewId);
  }
}
