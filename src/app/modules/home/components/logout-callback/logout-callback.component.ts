import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./logout-callback.component.html",
  standalone: false,
})
export class LogoutCallbackComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.navigateByUrl("/");
  }
}
