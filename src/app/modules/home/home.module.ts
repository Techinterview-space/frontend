import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { HomeComponent } from "./components/home/home.component";
import { NotAuthorizedErrorComponent } from "./components/not-authorized-error/not-authorized-error.component";
import { NotFoundErrorComponent } from "./components/not-found-error/not-found-error.component";
import { MeComponent } from "./components/me/me.component";
import { NoPermissionComponent } from "./components/no-permission/no-permission.component";
import { ServerUnavailableComponent } from "./components/server-unavailable/server-unavailable.component";
import { HomeRoutingModule } from "./home.routing-module";
import { AuthCallbackComponent } from "./components/auth-callback/auth-callback.component";
import { PrivacyPolicyPageComponent } from "./components/privacy-policy-page/privacy-policy-page.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { LogoutCallbackComponent } from "./components/logout-callback/logout-callback.component";
import { TelegramBotABoutComponent } from "./components/telegram-bot/telegram-bot.component";
import { FormsModule } from "@angular/forms";
import { UnsibscribeMeComponent } from "./components/unsubscribe-me/unsubscribe-me.component";
import { ErrorPageComponent } from "./components/error-page-component/error-page-component.component";

@NgModule({
  declarations: [
    HomeComponent,
    NotAuthorizedErrorComponent,
    NotFoundErrorComponent,
    MeComponent,
    NoPermissionComponent,
    ServerUnavailableComponent,
    AuthCallbackComponent,
    PrivacyPolicyPageComponent,
    AboutUsComponent,
    LogoutCallbackComponent,
    TelegramBotABoutComponent,
    UnsibscribeMeComponent,
    ErrorPageComponent,
  ],
  exports: [ErrorPageComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, FormsModule],
})
export class HomeModule {}
