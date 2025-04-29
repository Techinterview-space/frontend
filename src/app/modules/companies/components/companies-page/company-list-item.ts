import { Company } from "@models/companies.model";

export class CompanyListItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly links: string[];

  constructor(private readonly company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.description =
      company.description != null && company.description.length > 50
        ? company.description.substring(0, 100) + "..."
        : company.description;

    this.links = company.links;
  }
}
