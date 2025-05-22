import { Component, OnInit } from "@angular/core";

interface IContributor {
  link: string;
  username: string;
}

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
  standalone: false,
})
export class AboutUsComponent {
  contributors: IContributor[] = [
    {
      link: "https://github.com/nrglv",
      username: "nrglv",
    },
    {
      link: "https://github.com/indicozy",
      username: "indicozy",
    },
    {
      link: "https://github.com/sanch941",
      username: "sanch941",
    },
    {
      link: "https://github.com/galymzhanxyz",
      username: "galymzhanxyz",
    },
    {
      link: "https://github.com/drugoi",
      username: "drugoi",
    },
    {
      link: "https://github.com/kabdibereke",
      username: "kabdibereke",
    },
    {
      link: "https://github.com/keksonoid",
      username: "keksonoid",
    },
    {
      link: "https://github.com/maximgorbatyuk",
      username: "maximgorbatyuk",
    },
  ];

  readonly stickerImages = [
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/stickers/sticker_1_512.png",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/stickers/sticker_2_512.png",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/stickers/sticker_3_512.png",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/stickers/sticker_4_512.png",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/stickers/sticker_5_512.png",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/stickers/sticker_6_512.png",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/stickers/sticker_7_512.png",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/stickers/sticker_8_512.png",
  ];
}
