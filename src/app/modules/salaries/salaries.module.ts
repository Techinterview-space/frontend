import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalariesRoutingModule } from "./salaries-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "@shared/shared.module";
import { SalariesChartComponent } from "./components/salaries-chart/salaries-chart.component";
import { AddSalaryComponent } from "./components/add-salary/add-salary.component";
import { SalariesByGradesChartComponent } from "./components/salaries-by-grades-chart/salaries-by-grades-chart.component";
import { SalaryBlockValueComponent } from "./components/salaries-chart/salary-block-value/salary-block-value.component";
import { SalaryBlockRemoteValueComponent } from "./components/salaries-chart/salary-block-remote-value/salary-block-remote-value.component";
import { SalaryChartGlobalFiltersComponent } from "./components/salaries-chart/salary-chart-global-filters/salary-chart-global-filters.component";
import { EditSalaryComponent } from "./components/edit-salary/edit-salary.component";
import { CitiesDoughnutChartComponent } from "./components/cities-doughnut-chart/cities-doughnut-chart.component";
import { GradesMinMaxChartComponent } from "./components/grades-min-max-salaries-chart/grades-min-max-chart.component";
import { SalariesSkillsChartComponent } from "./components/salaries-skills-chart/salaries-skills-chart.component";
import { PeopleDistributionChartComponent } from "./components/professions-distribution-chart/people-distribution-chart.component";
import { WorkIndustriesChartComponent } from "./components/work-industries-chart/work-industries-chart.component";
import { PeopleByGradesChartComponent } from "./components/people-by-grades-chart/people-by-grades-chart.component";
import { PredefinedInfoBlockComponent } from "./components/salaries-chart/predefined-filter-info/predefined-info-block.component";
import { PeopleByGenderChartComponent } from "./components/people-by-gender-chart/people-by-gender-chart.component";
import { PeopleByAgeChartComponent } from "./components/people-by-age-chart/people-by-age-chart.component";
import { PeopleByExperienceChartComponent } from "./components/people-by-experience-chart/people-by-experience-chart.component";
import { SalariesByGradeBlockComponent } from "./components/salaries-chart/salaries-by-grade/salaries-by-grade-block.component";
import { SalariesPaginatedTableComponent } from "./components/salaries-paginated-table/salaries-paginated-table.component";
import { SalariesAddingChartComponent } from "./components/salaries-chart/salaries-adding-chart/salaries-adding-chart.component";
import { CurrencySelectBoxComponent } from "./components/salaries-chart/currency-select-box/currency-select-box.component";
import { HistoricalChartsPageComponent } from "./components/historical-charts-page/historical-charts-page.component";
import { HistoricalSalariesChartComponent } from "./components/historical-charts-page/historical-salaries-chart/historical-charts-page.component";
import { HistoricalSalariesByGradeChartComponent } from "./components/historical-charts-page/historical-salaries-by-grade-chart/historical-salaries-by-grade-chart.component";
import { SalariesByAgeChartComponent } from "./components/salaries-by-age-chart/salaries-by-age-chart.component";
import { SalariesByExperienceChartComponent } from "./components/salaries-by-experience-chart/salaries-by-experience-chart.component";
import { SalariesByCityChartComponent } from "./components/salaries-by-cities-chart/salaries-by-city-chart.component";
import { SalariesByGenderChartComponent } from "./components/people-by-gender-chart/salaries-by-gender-chart/salaries-by-gender-chart.component";
import { AddSalaryProgrssBarComponent } from "./components/add-salary/add-salary-progress-bar/add-salary-progress-bar.component";
import { UsefulnessRatingComponent } from "./components/salaries-chart/usefulness-rating/usefulness-rating.component";
import { ThankYouForFeedbackComponent } from "./components/salaries-chart/thank-you-for-feedback/thank-you-for-feedback.component";

@NgModule({
  declarations: [
    SalariesChartComponent,
    AddSalaryComponent,
    EditSalaryComponent,
    SalariesByGradesChartComponent,
    SalaryBlockValueComponent,
    SalaryBlockRemoteValueComponent,
    SalaryChartGlobalFiltersComponent,
    CitiesDoughnutChartComponent,
    GradesMinMaxChartComponent,
    SalariesByGradesChartComponent,
    SalariesSkillsChartComponent,
    PeopleDistributionChartComponent,
    WorkIndustriesChartComponent,
    PeopleByGradesChartComponent,
    PredefinedInfoBlockComponent,
    PeopleByGenderChartComponent,
    PeopleByAgeChartComponent,
    PeopleByExperienceChartComponent,
    SalariesByGradeBlockComponent,
    SalariesPaginatedTableComponent,
    SalariesAddingChartComponent,
    CurrencySelectBoxComponent,
    HistoricalChartsPageComponent,
    HistoricalSalariesChartComponent,
    HistoricalSalariesByGradeChartComponent,
    SalariesByAgeChartComponent,
    SalariesByExperienceChartComponent,
    SalariesByCityChartComponent,
    SalariesByGenderChartComponent,
    AddSalaryProgrssBarComponent,
    UsefulnessRatingComponent,
    ThankYouForFeedbackComponent,
  ],
  imports: [
    CommonModule,
    SalariesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class SalariesModule {}
