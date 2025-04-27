export interface Company {
  id: string;
  name: string;
  description: string;
  links: string[];
  logoUrl: string;
  rating: number;
  reviewsCount: number;
  reviews: Array<CompanyReview>;
  ratingHistory: Array<CompanyRatingHistory>;
  userIsAllowedToAddReview: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface CompanyReview {
  id: string;

  cultureAndValues: number;
  codeQuality: number | null;
  workLifeBalance: number;
  compensationAndBenefits: number;
  careerOpportunities: number;
  management: number;

  totalRating: number;
  pros: string;
  cons: string;
  iWorkHere: boolean;
  userEmployment: CompanyEmploymentType;
  companyId: string;
  createdAt: Date;
  approvedAt: Date | null;
  outdatedAt: Date | null;
}

export interface CompanyRatingHistory {
  rating: number;
  createdAt: Date;
}

export enum CompanyEmploymentType {
  Undefined = 0,
  FullTime = 1,
  PartTime = 2,
  Internship = 3,
  IndividualContractor = 4,
}

export class CompanyEmploymentTypeEnum {
  static readonly employmentTypes: Array<CompanyEmploymentType> = [
    CompanyEmploymentType.FullTime,
    CompanyEmploymentType.PartTime,
    CompanyEmploymentType.Internship,
    CompanyEmploymentType.IndividualContractor,
  ];
}
