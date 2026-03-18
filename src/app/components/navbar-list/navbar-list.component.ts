import { Component, Input } from "@angular/core";

export interface NavbarLink {
  title: string;
  url: string;
  show: boolean;
}

export interface NavbarDropdown {
  title: string;
  links: NavbarLink[];
  show: boolean;
}

@Component({
  selector: "app-navbar-list",
  templateUrl: "./navbar-list.component.html",
  styleUrls: ["./navbar-list.component.scss"],
  standalone: false,
})
export class NavbarListComponent {
  @Input() dropdowns: NavbarDropdown[] = [];
}