import { DeveloperGrade } from "@models/enums";

export interface InterviewSubject {
  title: string;
  grade: DeveloperGrade | null;
  comments: string | null;
}
