import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { InterviewTemplate } from "@models/interview-models";
import { Label } from "@models/user-label.model";
import {
  InterviewTemplateCreateRequest,
  InterviewTemplateUpdateRequest,
} from "@services/interview-templates.service";

export class InterviewTemplateFormGroup extends FormGroup {
  get subjectsFormArray(): FormArray {
    return this.get("subjects") as FormArray;
  }

  get subjectsCount(): number {
    return this.subjectsFormArray.controls.length;
  }

  private readonly templateId: string | null;

  constructor(template: InterviewTemplate | null = null) {
    if (template == null) {
      super({
        title: new FormControl(null, [
          Validators.required,
          Validators.max(150),
        ]),
        overallOpinion: new FormControl(null, [Validators.max(20000)]),
        isPublic: new FormControl(false),
        subjects: new FormArray([]),
        organizationId: new FormControl(null, []),
      });
    } else {
      super({
        title: new FormControl(template.title, [
          Validators.required,
          Validators.max(150),
        ]),
        overallOpinion: new FormControl(template.overallOpinion, [
          Validators.max(20000),
        ]),
        isPublic: new FormControl(template.isPublic),
        subjects: new FormArray([]),
        organizationId: new FormControl(template.organizationId, []),
      });

      template.subjects?.forEach((subject) => {
        this.subjectsFormArray.push(
          InterviewTemplateFormGroup.createSubjectFormGroup(
            subject.title,
            subject.description,
          ),
        );
      });
    }

    this.templateId = template?.id ?? null;
  }

  addSubject(): void {
    this.subjectsFormArray.push(
      InterviewTemplateFormGroup.createSubjectFormGroup(null, null),
    );
  }

  removeSubject(subjectIndex: number): void {
    this.subjectsFormArray.removeAt(subjectIndex);
  }

  canBeMovedUp(subjectIndex: number): boolean {
    return subjectIndex > 0;
  }

  canBeMovedDown(subjectIndex: number): boolean {
    return subjectIndex !== this.subjectsCount - 1;
  }

  moveUp(subjectIndex: number): void {
    if (!this.canBeMovedUp(subjectIndex)) {
      return;
    }

    const subject = this.subjectsFormArray.controls[subjectIndex];
    this.subjectsFormArray.removeAt(subjectIndex);
    this.subjectsFormArray.insert(subjectIndex - 1, subject);
  }

  moveDown(subjectIndex: number): void {
    if (!this.canBeMovedDown(subjectIndex)) {
      return;
    }

    const subject = this.subjectsFormArray.controls[subjectIndex];
    this.subjectsFormArray.removeAt(subjectIndex);
    this.subjectsFormArray.insert(subjectIndex + 1, subject);
  }

  getSubjectTitleField(subjectIndex: number): AbstractControl {
    return this.subjectsFormArray.controls[subjectIndex]?.get(
      "title",
    ) as AbstractControl;
  }

  getSubjectDescriptionField(subjectIndex: number): AbstractControl {
    return this.subjectsFormArray.controls[subjectIndex]?.get(
      "description",
    ) as AbstractControl;
  }

  createRequest(
    selectedLabels: Array<Label>,
  ): InterviewTemplateCreateRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    const subjects = this.subjectsFormArray.controls.map((subject) => {
      return {
        title: subject.get("title")?.value as string,
        description: subject.get("description")?.value as string | null,
      };
    });

    return {
      title: this.get("title")?.value as string,
      overallOpinion: this.get("overallOpinion")?.value as string,
      isPublic: this.get("isPublic")?.value as boolean,
      organizationId: this.get("organizationId")?.value as string | null,
      subjects,
      labels: selectedLabels,
    };
  }

  updateRequest(
    selectedLabels: Array<Label>,
  ): InterviewTemplateUpdateRequest | null {
    var createRequest = this.createRequest(selectedLabels);

    if (createRequest == null) {
      return null;
    }

    if (this.templateId == null) {
      throw Error("There is no template id");
    }

    return {
      id: this.templateId!,
      title: createRequest.title,
      overallOpinion: createRequest.overallOpinion,
      isPublic: createRequest.isPublic,
      organizationId: createRequest.organizationId,
      subjects: createRequest.subjects,
      labels: createRequest.labels,
    };
  }

  private static createSubjectFormGroup(
    title: string | null,
    description: string | null,
  ): FormGroup {
    description = description ?? "Junior:\r\n\r\nMiddle: \r\n\r\nSenior:";
    return new FormGroup({
      title: new FormControl(title, [Validators.required, Validators.max(150)]),
      description: new FormControl(description, [Validators.max(2000)]),
    });
  }
}
