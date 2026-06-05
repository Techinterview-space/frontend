import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { VacanciesService } from "@services/vacancies.service";
import { Vacancy } from "@models/vacancy.model";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

export interface VacancyResolverData {
  vacancy: Vacancy | null;
}

/**
 * Resolver that fetches a public vacancy before the component loads so meta
 * tags can be set during SSR. Non-public vacancies (draft/closed/deleted) are
 * not visible to the anonymous SSR request and resolve to null; the component
 * re-fetches client-side with the user's auth for owner/admin viewing.
 */
export const vacancyResolver: ResolveFn<VacancyResolverData> = (route) => {
  const vacanciesService = inject(VacanciesService);
  const id = route.paramMap.get("id");

  if (!id) {
    return of({ vacancy: null });
  }

  return vacanciesService.byId(id).pipe(
    map((vacancy) => ({ vacancy })),
    catchError(() => of({ vacancy: null })),
  );
};
