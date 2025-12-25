import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompaniesPageComponent } from "./components/companies-page/companies-page.component";
import { CompanyPageComponent } from "./components/company-page/company-page.component";
import { AddCompanyReviewPageComponent } from "./components/add-review-page/add-review-page.component";
import { AuthGuard } from "@shared/guards/auth.guard";
import { RecentReviewsPageComponent } from "./components/recent-reviews/recent-reviews-page.component";
import { companyResolver } from "./resolvers/company.resolver";

const routes: Routes = [
  { path: "", component: CompaniesPageComponent },
  {
    path: "recent-reviews",
    component: RecentReviewsPageComponent,
  },
  {
    path: ":id",
    component: CompanyPageComponent,
    resolve: { companyData: companyResolver },
  },
  {
    path: ":id/add-review",
    component: AddCompanyReviewPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
