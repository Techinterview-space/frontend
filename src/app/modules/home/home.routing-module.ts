import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { NotAuthorizedErrorComponent } from "./components/not-authorized-error/not-authorized-error.component";
import { NotFoundErrorComponent } from "./components/not-found-error/not-found-error.component";
import { MeComponent } from "./components/me/me.component";
import { NoPermissionComponent } from "./components/no-permission/no-permission.component";
import { ServerUnavailableComponent } from "@modules/home/components/server-unavailable/server-unavailable.component";
import { AuthCallbackComponent } from "./components/auth-callback/auth-callback.component";
import { PrivacyPolicyPageComponent } from "./components/privacy-policy-page/privacy-policy-page.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { LogoutCallbackComponent } from "./components/logout-callback/logout-callback.component";
import { TelegramBotABoutComponent } from "./components/telegram-bot/telegram-bot.component";
import { UnsibscribeMeComponent } from "./components/unsubscribe-me/unsubscribe-me.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { ForgotPasswordPageComponent } from "./components/forgot-password-page/forgot-password-page.component";
import { ResetPasswordPageComponent } from "./components/reset-password-page/reset-password-page.component";
import { VerifyEmailPageComponent } from "./components/verify-email-page/verify-email-page.component";
import { DesignSystemComponent } from "./components/design-system/design-system.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "me", component: MeComponent },
  { path: "no-permission", component: NoPermissionComponent },
  { path: "not-authorized", component: NotAuthorizedErrorComponent },
  { path: "server-unavailable", component: ServerUnavailableComponent },
  { path: "not-found", component: NotFoundErrorComponent },
  { path: "auth-callback", component: AuthCallbackComponent },
  { path: "logout-callback", component: LogoutCallbackComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "agreements/privacy-policy", component: PrivacyPolicyPageComponent },
  { path: "about-telegram-bot", component: TelegramBotABoutComponent },
  { path: "design-system", component: DesignSystemComponent },
  { path: "unsubscribe", component: UnsibscribeMeComponent },
  // Authentication routes
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "forgot-password", component: ForgotPasswordPageComponent },
  { path: "reset-password", component: ResetPasswordPageComponent },
  { path: "verify-email", component: VerifyEmailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
