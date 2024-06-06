import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import Assertion from "@shared/validation/assertion";

export interface QueryParameter {
  key: string;
  value: string | null;
}

// This class should not be injected
export class ActivatedRouteExtended {
  constructor(private readonly activatedRoute: ActivatedRoute) {
    Assertion.notNull(activatedRoute, "activatedRoute");
  }

  getQueryParams(paramNames: Array<string>): Observable<Array<QueryParameter>> {
    return this.activatedRoute.queryParams.pipe(
      map((params) => {
        const result: Array<QueryParameter> = [];
        paramNames.forEach((x) => {
          result.push({
            key: x,
            value: params[x] ?? null,
          });
        });
        return result;
      })
    );
  }

  getQueryParam(paramName: string): Observable<string> {
    return this.activatedRoute.queryParams.pipe(
      map((params) => {
        return params[paramName] ?? null;
      })
    );
  }

  getParam(paramName: string): Observable<string | null> {
    return this.activatedRoute.paramMap.pipe(
      map((params) => {
        return params.get(paramName) as string;
      })
    );
  }

  getIdFromRoute(throwErrorIfAintExist = true): Observable<number | null> {
    return this.getParamAsNumber("id", throwErrorIfAintExist);
  }

  getParamAsNumber(
    paramName: string,
    throwErrorIfAintExist = true
  ): Observable<number | null> {
    return this.activatedRoute.paramMap.pipe(
      map((params) => {
        const paramValue = params.get(paramName);

        if (paramValue == null) {
          if (throwErrorIfAintExist) {
            throw Error(`A paramenter ${paramName} does not exist in route`);
          }

          return null;
        }

        const paramAsNumber = Number(paramValue);
        if (isNaN(paramAsNumber)) {
          throw Error(
            `A paramenter ${paramName} is not a valid number (${paramValue})`
          );
        }

        return paramAsNumber;
      })
    );
  }
}
