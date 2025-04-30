import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompaniesPageComponent } from "./components/companies-page/companies-page.component";
import { CompanyPageComponent } from "./components/company-page/company-page.component";
import { AddCompanyReviewPageComponent } from "./components/add-review-page/add-review-page.component";
import { AuthGuard } from "@shared/guards/auth.guard";

const routes: Routes = [
  { path: "", component: CompaniesPageComponent },
  { path: ":id", component: CompanyPageComponent },
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
