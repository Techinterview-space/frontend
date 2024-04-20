export interface LabelEntityDto {
  id: number;
  title: string;
  hexColorAsString: string;
}

export interface LabelEntityAdmiDto extends LabelEntityDto {
  createdById: number | null;
  createdBy: string | null;
}

export interface CreateLabelEntityRequest {
  title: string;
  hexColor: string;
}

export interface UpdateLabelEntityRequest extends CreateLabelEntityRequest {
  id: number;
}
