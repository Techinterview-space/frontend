import { NgModule } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { serverRoutes } from './app.routes.server';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0ServerMockService } from '@shared/services/auth/auth0-server.mock';

@NgModule({
  imports: [AppModule],
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    // Provide mock Auth0 service for SSR (real service requires browser APIs)
    { provide: AuthService, useClass: Auth0ServerMockService },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
