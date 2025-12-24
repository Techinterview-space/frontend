import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CompaniesService } from "@services/companies.service";
import { Company } from "@models/companies.model";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

export interface CompanyResolverData {
  company: Company | null;
}

/**
 * Resolver that fetches company data before the component loads.
 * This ensures meta tags can be set during SSR.
 */
export const companyResolver: ResolveFn<CompanyResolverData> = (route) => {
  const companiesService = inject(CompaniesService);
  const companyId = route.paramMap.get("id");

  if (!companyId) {
    return of({ company: null });
  }

  return companiesService.byId(companyId).pipe(
    map((response) => ({ company: response.company })),
    catchError(() => of({ company: null })),
  );
};
