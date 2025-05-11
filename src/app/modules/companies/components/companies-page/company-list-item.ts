import { Company } from "@models/companies.model";

export class CompanyListItem {
  static readonly DescriptionMaxLength = 100;

  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly links: string[];
  readonly reviewsCount: number;
  readonly viewsCount: number;
  readonly rating: number;

  constructor(private readonly company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.description =
      company.description != null &&
      company.description.length > CompanyListItem.DescriptionMaxLength
        ? company.description.substring(
            0,
            CompanyListItem.DescriptionMaxLength,
          ) + "..."
        : company.description;

    this.links = company.links;
    this.reviewsCount = company.reviewsCount;
    this.viewsCount = company.viewsCount;
    this.rating = company.rating;
  }
}
