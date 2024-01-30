import { DeveloperGrade } from "@models/enums";
import { UserProfession } from "@models/salaries/user-profession";
import { ActivatedRouteExtended, QueryParameter } from "@shared/routes/activated-route-extended";
import { Observable, map } from "rxjs";
import { SalaryChartGlobalFiltersData } from "./salary-chart-global-filters/global-filters-form-group";
import { ActivatedRoute } from "@angular/router";

export class SalariesChartActivatedRoute {

    static readonly gradeRouteParamName = 'grade';
    static readonly profsIncludeRouteParamName = 'profsInclude';
    static readonly profsExcludeRouteParamName = 'profsExclude';

    private readonly activatedRoute: ActivatedRouteExtended

    constructor(activatedRoute: ActivatedRoute) {
        this.activatedRoute = new ActivatedRouteExtended(activatedRoute);
    }

    prepareQueryParamsAsString(data: SalaryChartGlobalFiltersData): string {
        let queryParams = '?';

        if (data.grade != null) {
            queryParams += `${SalariesChartActivatedRoute.gradeRouteParamName}=${data.grade}`;
        }

        if (data.profsToInclude.length > 0) {
            const profsValue = `${SalariesChartActivatedRoute.profsIncludeRouteParamName}=${data.profsToInclude.map(x => x.toString()).join(',')}`;
            queryParams += `${queryParams.length > 1 ? '&' : ''}${profsValue}`;
        }

        if (data.profsToExclude.length > 0) {
            const profsExcludeValue = `${SalariesChartActivatedRoute.profsExcludeRouteParamName}=${data.profsToExclude.map(x => x.toString()).join(',')}`;
            queryParams += `${queryParams.length > 1 ? '&' : ''}${profsExcludeValue}`;
        }

        return queryParams;
    }

    getQueryParams(): Observable<SalaryChartGlobalFiltersData> {
        return this.activatedRoute
            .getQueryParams([
                SalariesChartActivatedRoute.gradeRouteParamName,
                SalariesChartActivatedRoute.profsIncludeRouteParamName,
                SalariesChartActivatedRoute.profsExcludeRouteParamName,
            ])
            .pipe(map(queryParams => {
                const gradeString = queryParams
                    .find(x => x.key === SalariesChartActivatedRoute.gradeRouteParamName)
                    ?.value ?? null;

                let grade: DeveloperGrade | null = null;

                if (gradeString != null && gradeString !== '' && gradeString !== 'null') {
                    grade = Number(gradeString) as DeveloperGrade;
                }

                let profsInclude: Array<UserProfession> = [];
                const profsToIncludeValue = queryParams
                    .find(x => x.key === SalariesChartActivatedRoute.profsIncludeRouteParamName)
                    ?.value ?? null;

                if (profsToIncludeValue && profsToIncludeValue !== '') {
                    profsInclude = profsToIncludeValue.split(',').map(x => Number(x) as UserProfession);
                }

                let profsExclude: Array<UserProfession> = [];
                const profsToExcludeValue = queryParams
                    .find(x => x.key === SalariesChartActivatedRoute.profsExcludeRouteParamName)
                    ?.value ?? null;

                if (profsToExcludeValue && profsToExcludeValue !== '') {
                    profsExclude = profsToExcludeValue.split(',').map(x => Number(x) as UserProfession);
                }

                return new SalaryChartGlobalFiltersData(grade, profsInclude, profsExclude);
            }));
    }
}