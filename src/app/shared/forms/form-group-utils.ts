export interface InvalidFieldsGroupedByPage {
  page: number;
  fields: string[];
}

export interface InvalidField {
  page: number;
  controlName: string;
  field: string;
}
