export enum DeveloperGrade {
  Unknown = 0,
  Trainee = 1,

  Junior = 2,
  JuniorStrong = 3,

  MiddleMinus = 4,
  Middle = 5,
  MiddleStrong = 6,

  SeniorMinus = 7,
  Senior = 8,
  SeniorStrong = 9,

  LeadMinus = 10,
  Lead = 11,
  LeadStrong = 12,
}

export interface DeveloperGradeLabel {
  label: string;
  cssBackground: string;
  cssText: string;
}

export class DeveloperGradeEnum {

  static readonly grades: Array<DeveloperGrade> = [
    DeveloperGrade.Trainee,
    DeveloperGrade.Junior,
    DeveloperGrade.Middle,
    DeveloperGrade.Senior,
    DeveloperGrade.Lead,
    DeveloperGrade.Unknown,
  ];

  static readonly defaultColor = {
    label: "Не указан",
    cssBackground: "bg-secondary",
    cssText: "text-dark",
  };

  static readonly colorsByGrade: Map<
    DeveloperGrade,
    DeveloperGradeLabel
  > = new Map([
    [DeveloperGrade.Trainee, {
        label: "Trainee",
        cssBackground: "bg-light",
        cssText: "text-dark",
      }
    ],
    [DeveloperGrade.Junior, {
      label: "Junior",
      cssBackground: "bg-success",
      cssText: "text-light",
    }],
    [DeveloperGrade.Middle, {
      label: "Middle",
      cssBackground: "bg-warning",
      cssText: "text-dark",
    }],
    [DeveloperGrade.Senior, {
      label: "Senior",
      cssBackground: "bg-info",
      cssText: "text-dark",
    }],
    [DeveloperGrade.Lead, {
      label: "Lead",
      cssBackground: "bg-primary",
      cssText: "text-light",
    }],
    [DeveloperGrade.Unknown, DeveloperGradeEnum.defaultColor],
  ]);

  static getColorData(grade: DeveloperGrade): DeveloperGradeLabel {
    return DeveloperGradeEnum.colorsByGrade.get(grade) ?? DeveloperGradeEnum.defaultColor;
  }
}