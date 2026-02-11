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
import { environment } from "src/environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { applicationServices } from "./services";
import { AuthInterceptor } from "@shared/interceptors/auth-interceptor";
import { DateParserInterceptor } from "@shared/interceptors/date-parser-interceptor";
import { SpinnerInterceptor } from "@shared/interceptors/spinner-interceptor";
import { SharedModule } from "@shared/shared.module";
import { AdminNavbarComponent } from "@components/admin-navbar/admin-navbar.component";
import { NavbarComponent } from "@components/navbar/navbar.component";
import { MaintenanceComponent } from "@components/maintenance/maintenance.component";

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
