import { Component, OnInit } from "@angular/core";

interface IContributor {
  link: string;
  username: string;
}

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
})
export class AboutUsComponent {
  contributors: IContributor[] = [
    {
      link: "https://github.com/indicozy",
      username: "indicozy",
    },
    {
      link: "https://github.com/sanch941",
      username: "sanch941",
    },
    {
      link: "https://github.com/galym-abitech",
      username: "galym-abitech",
    },
    {
      link: "https://github.com/maximgorbatyuk",
      username: "maximgorbatyuk",
    },
  ];
}
