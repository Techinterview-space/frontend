import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { z } from "zod";
import { ApiService } from "./api.service";
import {
  Company,
  CompanyEmploymentType,
  CompanyReview,
  CompanySchema,
} from "@models/companies.model";
import { PageParams, PageParamsSchema } from "@models/page-params";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { PaginatedList } from "@models/paginated-list";
import { OpenAiChatResult } from "@models/open-ai.model";

export const CompaniesSearchParamsSchema = PageParamsSchema.extend({
  searchQuery: z.string().nullable(),
  withRating: z.boolean(),
});

export type CompaniesSearchParams = z.infer<typeof CompaniesSearchParamsSchema>;

export const CompaniesSearchParamsForAdminSchema = PageParamsSchema.extend({
  companyName: z.string().nullable(),
});

export type CompaniesSearchParamsForAdmin = z.infer<
  typeof CompaniesSearchParamsForAdminSchema
>;

export const CompanyEditRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  links: z.array(z.string()),
  logoUrl: z.string(),
});

export type CompanyEditRequest = z.infer<typeof CompanyEditRequestSchema>;

export const CompanyUpdateRequestSchema = CompanyEditRequestSchema.extend({
  slug: z.string(),
});

export type CompanyUpdateRequest = z.infer<typeof CompanyUpdateRequestSchema>;

export const CompanyReviewCreateRequestSchema = z.object({
  cultureAndValues: z.number(),
  codeQuality: z.number(),
  workLifeBalance: z.number(),
  compensationAndBenefits: z.number(),
  careerOpportunities: z.number(),
  management: z.number(),
  pros: z.string(),
  cons: z.string(),
  iWorkHere: z.boolean(),
  userEmployment: z.nativeEnum(CompanyEmploymentType),
});

export type CompanyReviewCreateRequest = z.infer<
  typeof CompanyReviewCreateRequestSchema
>;

export const GetCompanyResponseSchema = z.object({
  company: CompanySchema,
  userIsAllowedToLeaveReview: z.boolean(),
  userHasAnyReview: z.boolean(),
});

export type GetCompanyResponse = z.infer<typeof GetCompanyResponseSchema>;

export const VoteResponseSchema = z.object({
  result: z.boolean(),
});

export type VoteResponse = z.infer<typeof VoteResponseSchema>;

@Injectable()
export class CompaniesService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/companies/`;
  }

  byId(id: string): Observable<GetCompanyResponse> {
    return this.api.get<GetCompanyResponse>(this.apiUrl + id);
  }

  byIdForAdmin(id: string): Observable<Company> {
    return this.api.get<Company>(this.apiUrl + id + "/for-admin");
  }

  update(id: string, model: CompanyUpdateRequest): Observable<void> {
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

  allForAdmin(
    pageParams: CompaniesSearchParamsForAdmin,
  ): Observable<PaginatedList<Company>> {
    return this.api.get<PaginatedList<Company>>(
      this.apiUrl +
        "for-admin?" +
        new ConvertObjectToHttpParams(pageParams).get(),
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

  recentReviews(params: PageParams): Observable<PaginatedList<CompanyReview>> {
    return this.api.get<PaginatedList<CompanyReview>>(
      "/api/companies/reviews/recent?" +
        new ConvertObjectToHttpParams(params).get(),
    );
  }

  likeReview(companyId: string, reviewId: string): Observable<VoteResponse> {
    return this.api.post<VoteResponse>(
      this.apiUrl + companyId + "/reviews/" + reviewId + "/like",
      {},
    );
  }

  dislikeReview(companyId: string, reviewId: string): Observable<VoteResponse> {
    return this.api.post<VoteResponse>(
      this.apiUrl + companyId + "/reviews/" + reviewId + "/dislike",
      {},
    );
  }

  getOpenAiAnalysis(companyIdentifier: string): Observable<OpenAiChatResult> {
    return this.api.get<OpenAiChatResult>(
      this.apiUrl + companyIdentifier + "/open-ai-analysis",
    );
  }
}
