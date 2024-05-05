import { AlertService } from "@shared/components/alert/services/alert.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { AuthSessionService } from "@shared/services/auth/auth.session.service";
import { SessionStorageWrapper } from "@shared/services/session-storage-wrapper.service";
import { SpinnerService } from "@shared/services/spinners/spinner-service";
import { AuthorizationService } from "./authorization.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { TitleService } from "./title.service";
import { InterviewTemplatesService } from "./interview-templates.service";
import { InterviewsService } from "./interviews.service";
import { UserAdminService } from "./user-admin.service";
import { UserLabelsService } from "./user-labels.service";
import { UsersService } from "./users.service";
import { UserSalariesService } from "./user-salaries.service";
import { SkillsService } from "./skills.service";
import { TelegramBotService } from "./telegram-bot.service";
import { SurveyService } from "./salaries-survey.service";

export * from "./authorization.service";
export * from "./api.service";
export * from "./base-api.service";
export * from "./title.service";
export * from "./interview-templates.service";
export * from "./interviews.service";
export * from "./user-admin.service";
export * from "./user-labels.service";
export * from "./users.service";

export const applicationServices = [
  SessionStorageWrapper,
  AuthService,
  AuthSessionService,
  AuthorizationService,
  SpinnerService,
  AlertService,
  GoogleAnalyticsService,
  TitleService,
  InterviewTemplatesService,
  InterviewsService,
  UserAdminService,
  UserLabelsService,
  UsersService,
  UserSalariesService,
  SkillsService,
  TelegramBotService,
  SurveyService,
];
