import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';
import { untilDestroyed } from './shared/subscriptions/until-destroyed';
import { MetaTagService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  title = 'Tech.Interview';

  timer = 'timer';
  transparent = 'transparent';

  private metatagsChanged = false;

  get showAdminNavbar(): boolean {
    return this.router.url.startsWith('/admin');
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly meta: MetaTagService,
    private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.router.events
      .subscribe((val) => {
        // see also
        if (val instanceof NavigationEnd) {
          if (val.url.startsWith('/salaries')) {
            this.meta.updateChartMetaTags(
              'Зарплаты в IT в Казахстане',
              'Здесь можно увидеть статистику по зарплатам в IT в Казахстане. Есть множество графиков по разным критериям, а также возможность применить необходимые фильтры.',
              '/salaries'
            );
            this.metatagsChanged = true;
          } else if (this.metatagsChanged) {
            this.meta.returnDefaultMetaTags();
            this.metatagsChanged = false;
          }
        }
      });

    this.authService
      .getCurrentUser()
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        if (user != null) {
          this.isAuthenticated = true;
        }
      });
  }

  ngOnDestroy(): void {}
}
