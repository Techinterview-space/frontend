import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CompaniesRoutingModule } from "./companies-routing.module";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "@shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CompanyPageComponent } from "./components/company-page/company-page.component";
import { AddCompanyReviewPageComponent } from "./components/add-review-page/add-review-page.component";
import { CompaniesPageComponent } from "./components/companies-page/companies-page.component";
import { RecentReviewsPageComponent } from "./components/recent-reviews/recent-reviews-page.component";
import { CompanyReviewBlockComponent } from "./components/company-review-block/company-review-block.component";

@NgModule({
  declarations: [
    CompanyPageComponent,
    AddCompanyReviewPageComponent,
    CompaniesPageComponent,
    RecentReviewsPageComponent,
    CompanyReviewBlockComponent,
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class CompaniesModule {}
