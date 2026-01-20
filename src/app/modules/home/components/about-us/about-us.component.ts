import { Component, OnDestroy } from "@angular/core";
import { MetaTagService } from "@services/meta-tags.service";

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
export class AboutUsComponent implements OnDestroy {
  constructor(private readonly metaTagService: MetaTagService) {
    this.metaTagService.setPageMetaTags(
      "О проекте Techinterview.space",
      "История и миссия проекта Techinterview.space. Контрибьюторы, стикеры, контакты.",
      "/about-us",
      null,
      false,
    );
  }

  ngOnDestroy(): void {
    this.metaTagService.returnDefaultMetaTags();
  }

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
