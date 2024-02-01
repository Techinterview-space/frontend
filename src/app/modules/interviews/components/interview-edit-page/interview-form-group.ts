import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeveloperGrade } from '@models/enums';
import { Interview, InterviewTemplate } from '@models/interview-models';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { Label } from '@models/user-label.model';
import { InterviewCreateRequest, InterviewUpdateRequest } from '@services/interviews.service';

export class InterviewFormGroup extends FormGroup {
  get subjectsFormArray(): FormArray {
    return this.get('subjects') as FormArray;
  }

  get subjectsCount(): number {
    return this.subjectsFormArray.controls.length;
  }

  readonly subjectDescriptions: Array<string | null>;

  private readonly interviewId: string | null;
  private readonly candidateCard: CandidateCard | null;

  constructor(interview: Interview | null = null, candidateCard: CandidateCard | null = null) {
    if (interview == null) {
      const candidateName = candidateCard?.candidate
        ? candidateCard!.candidate!.firstName + ' ' + candidateCard!.candidate!.lastName
        : null;
      super({
        candidateName: new FormControl(candidateName, [Validators.required, Validators.max(150)]),
        overallOpinion: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(20000)]),
        candidateGrade: new FormControl(null, [Validators.required]),
        subjects: new FormArray([]),
        organizationId: new FormControl(candidateCard?.organizationId, []),
        candidateCardId: new FormControl(candidateCard?.id)
      });
    } else {
      super({
        candidateName: new FormControl(interview.candidateName, [Validators.required, Validators.max(150)]),
        overallOpinion: new FormControl(interview.overallOpinion, [Validators.required, Validators.min(1), Validators.max(20000)]),
        candidateGrade: new FormControl(interview.candidateGrade, [Validators.required]),
        subjects: new FormArray([]),
        organizationId: new FormControl(interview.organizationId, [])
      });

      interview.subjects?.forEach((subject) => {
        this.subjectsFormArray.push(this.createSubjectFormGroup(subject.title, subject.grade, subject.comments));
      });
    }

    this.subjectDescriptions = [];
    this.interviewId = interview?.id ?? null;
    this.candidateCard = candidateCard ?? null;
  }

  addSubjectsFromTemplate(interviewTemplate: InterviewTemplate): void {
    const overallOpinionField = this.get('overallOpinion');

    if (overallOpinionField != null && overallOpinionField.value == null) {
      overallOpinionField.setValue(interviewTemplate.overallOpinion);
    }

    interviewTemplate.subjects?.forEach((subject) => {
      this.subjectsFormArray.push(this.createSubjectFormGroup(subject.title, null, null));
      this.subjectDescriptions.push(subject.description);
    });
  }

  clearSubjects(): void {
    this.subjectsFormArray.clear();
  }

  addSubject(): void {
    this.subjectsFormArray.push(this.createSubjectFormGroup(null, null, null));
    this.subjectDescriptions.push(null);
  }

  removeSubject(subjectIndex: number): void {
    this.subjectsFormArray.removeAt(subjectIndex);
    this.subjectDescriptions.splice(subjectIndex, 1);
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
    return this.subjectsFormArray.controls[subjectIndex]?.get('title') as AbstractControl;
  }

  getSubjectCommentsField(subjectIndex: number): AbstractControl {
    return this.subjectsFormArray.controls[subjectIndex]?.get('comments') as AbstractControl;
  }

  createRequest(selectedLabels: Array<Label>): InterviewCreateRequest | null {
    if (!this.valid) {
      console.error('createRequest invalid', this.errors);
      this.markAllAsTouched();
      return null;
    }

    const subjects = this.subjectsFormArray.controls.map((subject) => {
      const grade = subject.get('grade')?.value as string;
      const comments = subject.get('comments')?.value as string;

      return {
        title: subject.get('title')?.value,
        grade: grade != null ? (Number(grade) as DeveloperGrade) : null,
        comments
      };
    });

    const candidateGrade = this.get('candidateGrade')?.value as string;
    const candidateName = this.candidateCard
      ? this.candidateCard!.candidate!.firstName + ' ' + this.candidateCard!.candidate!.lastName
      : (this.get('candidateName')?.value as string);

    return {
      candidateName: candidateName,
      overallOpinion: this.get('overallOpinion')?.value as string,
      candidateGrade: candidateGrade != null ? (Number(candidateGrade) as DeveloperGrade) : null,
      subjects,
      labels: selectedLabels,
      organizationId: this.get('organizationId')?.value as string | null,
      candidateCardId: this.get('candidateCardId')?.value as string | null
    };
  }

  updateRequest(selectedLabels: Array<Label>): InterviewUpdateRequest | null {
    var createRequest = this.createRequest(selectedLabels);

    if (createRequest == null) {
      return null;
    }

    if (this.interviewId == null) {
      throw Error('There is no template id');
    }

    return {
      id: this.interviewId!,
      candidateName: createRequest.candidateName,
      overallOpinion: createRequest.overallOpinion,
      candidateGrade: createRequest.candidateGrade,
      subjects: createRequest.subjects,
      labels: createRequest.labels,
      organizationId: createRequest.organizationId,
      candidateCardId: createRequest.candidateCardId
    };
  }

  private createSubjectFormGroup(
    title: string | null,
    grade: DeveloperGrade | null,
    comments: string | null
  ): FormGroup {
    return new FormGroup({
      title: new FormControl(title, [Validators.required, Validators.max(150)]),
      grade: new FormControl(grade),
      comments: new FormControl(comments, [Validators.max(1000)])
    });
  }
}
