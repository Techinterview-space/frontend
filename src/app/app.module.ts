import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
  withHttpTransferCacheOptions,
} from "@angular/platform-browser";
import { NgxSpinnerModule } from "ngx-spinner";
import { environment } from "src/environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { applicationServices } from "./services";
import { AuthInterceptor } from "@shared/interceptors/auth-interceptor";
import { DateParserInterceptor } from "@shared/interceptors/date-parser-interceptor";
import { SpinnerInterceptor } from "@shared/interceptors/spinner-interceptor";
import { SharedModule } from "@shared/shared.module";
import { AdminModule } from "@modules/admin/admin.module";
import { InterviewsModule } from "@modules/interviews/interviews.module";
import { MarkdownModule } from "ngx-markdown";
import { AdminNavbarComponent } from "@components/admin-navbar/admin-navbar.component";
import { NavbarComponent } from "@components/navbar/navbar.component";
import { AuthModule } from "@auth0/auth0-angular";
import { MaintenanceComponent } from "@components/maintenance/maintenance.component";

const appModules: any[] = [AdminModule, InterviewsModule];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminNavbarComponent,
    MaintenanceComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    MarkdownModule.forRoot(),
    AuthModule.forRoot({
      domain: environment.auth.domain,
      clientId: environment.auth.client_id,
      authorizationParams: {
        redirect_uri: environment.auth.redirect_uri,
      },
    }),
    ...appModules,
    ...environment.googleAnalytics.imports,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateParserInterceptor,
      multi: true,
    },
    ...applicationServices,
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        includePostRequests: false,
      }),
    ),
  ],
})
export class AppModule {}
