import { NgModule, SecurityContext } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { MarkdownModule } from "ngx-markdown";
import { SharedModule } from "@shared/shared.module";
import { VacanciesRoutingModule } from "./vacancies-routing.module";
import { VacanciesPageComponent } from "./components/vacancies-page/vacancies-page.component";
import { VacancyPageComponent } from "./components/vacancy-page/vacancy-page.component";
import { VacancyEditPageComponent } from "./components/vacancy-edit-page/vacancy-edit-page.component";
import { MyVacanciesPageComponent } from "./components/my-vacancies-page/my-vacancies-page.component";

@NgModule({
  declarations: [
    VacanciesPageComponent,
    VacancyPageComponent,
    VacancyEditPageComponent,
    MyVacanciesPageComponent,
  ],
  imports: [
    CommonModule,
    VacanciesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MarkdownModule.forRoot({ sanitize: SecurityContext.HTML }),
  ],
})
export class VacanciesModule {}
