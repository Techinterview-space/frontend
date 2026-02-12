import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  CreatePublicSurveyRequest,
  PublicSurvey,
  PublicSurveyStatus,
  UpdatePublicSurveyRequest,
} from "@models/public-survey.model";

export class SurveyFormGroup extends FormGroup {
  private readonly surveyId: string | null;
  private readonly surveyStatus: PublicSurveyStatus;

  get optionsFormArray(): FormArray {
    return this.get("options") as FormArray;
  }

  get optionsCount(): number {
    return this.optionsFormArray.controls.length;
  }

  get canAddOption(): boolean {
    return this.optionsCount < 10;
  }

  get canRemoveOption(): boolean {
    return this.optionsCount > 2;
  }

  get isDraft(): boolean {
    return this.surveyStatus === PublicSurveyStatus.Draft;
  }

  constructor(survey: PublicSurvey | null = null) {
    const isDraft =
      survey == null || survey.status === PublicSurveyStatus.Draft;

    super({
      title: new FormControl(survey?.title ?? null, [
        Validators.required,
        Validators.maxLength(500),
      ]),
      description: new FormControl(survey?.description ?? null, [
        Validators.maxLength(2000),
      ]),
      slug: new FormControl(survey?.slug ?? null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/),
      ]),
      question: new FormControl(survey?.question?.text ?? null, [
        Validators.required,
        Validators.maxLength(500),
      ]),
      allowMultipleChoices: new FormControl(
        survey?.question?.allowMultipleChoices ?? false,
      ),
      options: new FormArray([] as FormGroup[]),
    });

    this.surveyId = survey?.id ?? null;
    this.surveyStatus = survey?.status ?? PublicSurveyStatus.Draft;

    if (survey?.question?.options?.length) {
      const sorted = [...survey.question.options].sort(
        (a, b) => a.order - b.order,
      );
      sorted.forEach((opt) => {
        this.optionsFormArray.push(SurveyFormGroup.createOptionFormGroup(opt.text));
      });
    } else {
      this.optionsFormArray.push(SurveyFormGroup.createOptionFormGroup(null));
      this.optionsFormArray.push(SurveyFormGroup.createOptionFormGroup(null));
    }

    if (!isDraft) {
      this.get("title")!.disable();
      this.get("slug")!.disable();
      this.get("question")!.disable();
      this.get("allowMultipleChoices")!.disable();
      this.optionsFormArray.controls.forEach((c) => c.disable());
    }
  }

  addOption(): void {
    if (!this.canAddOption) {
      return;
    }

    this.optionsFormArray.push(SurveyFormGroup.createOptionFormGroup(null));
  }

  removeOption(index: number): void {
    if (!this.canRemoveOption) {
      return;
    }

    this.optionsFormArray.removeAt(index);
  }

  canBeMovedUp(index: number): boolean {
    return index > 0;
  }

  canBeMovedDown(index: number): boolean {
    return index < this.optionsCount - 1;
  }

  moveUp(index: number): void {
    if (!this.canBeMovedUp(index)) {
      return;
    }

    this.swapOptions(index, index - 1);
  }

  moveDown(index: number): void {
    if (!this.canBeMovedDown(index)) {
      return;
    }

    this.swapOptions(index, index + 1);
  }

  moveOption(fromIndex: number, toIndex: number): void {
    if (
      fromIndex === toIndex ||
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= this.optionsCount ||
      toIndex >= this.optionsCount
    ) {
      return;
    }

    const control = this.optionsFormArray.at(fromIndex);
    this.optionsFormArray.removeAt(fromIndex);
    this.optionsFormArray.insert(toIndex, control);
  }

  getOptionTextField(index: number): AbstractControl {
    return this.optionsFormArray.controls[index]?.get("text") as AbstractControl;
  }

  generateSlugFromTitle(): void {
    const title = this.get("title")?.value as string;
    if (!title) {
      return;
    }

    const slug = SurveyFormGroup.transliterate(title)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 100);

    this.get("slug")!.setValue(slug);
  }

  createRequest(): CreatePublicSurveyRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    const options = this.optionsFormArray.controls.map(
      (c) => c.get("text")?.value as string,
    );

    return {
      title: this.get("title")?.value as string,
      description: (this.get("description")?.value as string) || undefined,
      slug: this.get("slug")?.value as string,
      question: this.get("question")?.value as string,
      allowMultipleChoices: this.get("allowMultipleChoices")?.value as boolean,
      options,
    };
  }

  updateRequest(): UpdatePublicSurveyRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    const rawDescription = this.get("description")?.value as string | null;
    const description = rawDescription == null ? undefined : rawDescription;

    if (!this.isDraft) {
      return {
        description,
      };
    }

    const options = this.optionsFormArray.controls.map((c, i) => ({
      text: c.get("text")?.value as string,
      order: i,
    }));

    return {
      title: this.get("title")?.value as string,
      description,
      slug: this.get("slug")?.value as string,
      question: this.get("question")?.value as string,
      allowMultipleChoices: this.get("allowMultipleChoices")?.value as boolean,
      options,
    };
  }

  private swapOptions(indexA: number, indexB: number): void {
    const controlA = this.optionsFormArray.at(indexA);
    const controlB = this.optionsFormArray.at(indexB);
    const valueA = controlA.value;
    controlA.setValue(controlB.value);
    controlB.setValue(valueA);
  }

  private static createOptionFormGroup(text: string | null): FormGroup {
    return new FormGroup({
      text: new FormControl(text, [
        Validators.required,
        Validators.maxLength(200),
      ]),
    });
  }

  private static readonly cyrillicMap: Record<string, string> = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e",
    "ё": "yo", "ж": "zh", "з": "z", "и": "i", "й": "j", "к": "k",
    "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r",
    "с": "s", "т": "t", "у": "u", "ф": "f", "х": "kh", "ц": "ts",
    "ч": "ch", "ш": "sh", "щ": "shch", "ъ": "", "ы": "y", "ь": "",
    "э": "e", "ю": "yu", "я": "ya",
  };

  private static transliterate(text: string): string {
    return text
      .split("")
      .map((char) => {
        const lower = char.toLowerCase();
        const mapped = SurveyFormGroup.cyrillicMap[lower];
        if (mapped !== undefined) {
          return char === lower ? mapped : mapped.charAt(0).toUpperCase() + mapped.slice(1);
        }
        return char;
      })
      .join("");
  }
}
