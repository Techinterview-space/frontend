import { Component } from '@angular/core';

interface NavbarLink {
  title: string;
  url: string;
}

interface NavbarDropdown {
  title: string;
  links: NavbarLink[];
}

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {
  readonly showSearchForm = false;
  readonly dropdowns: NavbarDropdown[];

  constructor() {
    this.dropdowns = [
      {
        title: 'Users',
        links: [
          {
            title: 'All users',
            url: '/admin/users'
          }
        ]
      },
      {
        title: 'Templates',
        links: [
          {
            title: 'All',
            url: '/admin/interview-templates'
          }
        ]
      },
      {
        title: 'Organizations',
        links: [
          {
            title: 'All',
            url: '/admin/organizations'
          }
        ]
      },
      {
        title: 'Salaries',
        links: [
          {
            title: 'All salaries',
            url: '/admin/salaries'
          },
          {
            title: 'Salaries to be approved',
            url: '/admin/salaries/not-in-stats'
          },
          {
            title: 'Salaries adding chart',
            url: '/admin/salaries/salaries-adding-trend-chart'
          },
          {
            title: 'Skills',
            url: '/admin/skills'
          },
        ]
      },
      {
        title: 'Tools',
        links: [
          {
            title: 'Background jobs',
            url: '/admin/background-jobs'
          }
        ]
      }
    ];
  }
}
