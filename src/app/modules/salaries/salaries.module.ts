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
import { SalariesSurveyBlockComponent } from "./components/salaries-survey-block/salaries-survey-block.component";
import { SalariesSurveyPageComponent } from "./components/salaries-survey-page/salaries-survey-page.component";
import { SalariesAddingChartComponent } from "./components/salaries-chart/salaries-adding-chart/salaries-adding-chart.component";

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
    SalariesSurveyBlockComponent,
    SalariesSurveyPageComponent,
    SalariesAddingChartComponent,
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
