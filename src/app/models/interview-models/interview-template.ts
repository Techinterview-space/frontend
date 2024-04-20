import { Label } from "@models/user-label.model";
import { ApplicationUser } from "..";
import { InterviewTemplateSubject } from "./interview-template-subject";

export interface InterviewTemplate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  overallOpinion: string | null;
  authorId: number;
  author: ApplicationUser | null;
  isPublic: boolean;
  organizationId: string | null;
  subjects: Array<InterviewTemplateSubject> | null;
  labels: Array<Label>;
}
