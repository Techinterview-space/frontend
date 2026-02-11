import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InterviewsRoutingModule } from "./interviews-routing.module";
import { SharedModule } from "@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyInterviewTemplatesComponent } from "./components/my-interview-templates/my-interview-templates.component";
import { InterviewTemplatePageComponent } from "./components/interview-template-page/interview-template-page.component";
import { InterviewTemplateEditPageComponent } from "./components/interview-template-edit-page/interview-template-edit-page.component";
import { MyInterviewsComponent } from "./components/my-interviews/my-interviews.component";
import { InterviewEditPageComponent } from "./components/interview-edit-page/interview-edit-page.component";
import { InterviewPageComponent } from "./components/interview-page/interview-page.component";
import { PublicInterviewTemplatesComponent } from "./components/public-interview-templates/public-interview-templates.component";
import { MarkdownModule } from "ngx-markdown";
import { InterviewMarkdownModalDialogComponent } from "./components/interview-page/interview-markdown-modal-dialog/interview-markdown-modal-dialog.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { InterviewsHomeComponent } from "./components/interviews-home/interviews-home.component";
import { TextWithLinebreaksComponent } from "./components/text-with-linebreaks/text-with-linebreaks.component";

@NgModule({
  declarations: [
    MyInterviewTemplatesComponent,
    InterviewTemplatePageComponent,
    InterviewTemplateEditPageComponent,
    MyInterviewsComponent,
    InterviewEditPageComponent,
    InterviewPageComponent,
    PublicInterviewTemplatesComponent,
    InterviewMarkdownModalDialogComponent,
    InterviewsHomeComponent,
    TextWithLinebreaksComponent,
  ],
  imports: [
    CommonModule,
    InterviewsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    NgSelectModule,
  ],
})
export class InterviewsModule {}
