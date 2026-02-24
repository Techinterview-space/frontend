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
  private static readonly MAX_QUESTIONS = 30;
  private static readonly MIN_OPTIONS = 2;
  private static readonly MAX_OPTIONS = 10;

  private readonly surveyId: string | null;
  private readonly surveyStatus: PublicSurveyStatus;

  get questionsFormArray(): FormArray {
    return this.get("questions") as FormArray;
  }

  get questionsCount(): number {
    return this.questionsFormArray.controls.length;
  }

  get canAddQuestion(): boolean {
    return this.questionsCount < SurveyFormGroup.MAX_QUESTIONS;
  }

  get canRemoveQuestion(): boolean {
    return this.questionsCount > 1;
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
      questions: new FormArray([] as FormGroup[]),
    });

    this.surveyId = survey?.id ?? null;
    this.surveyStatus = survey?.status ?? PublicSurveyStatus.Draft;

    if (survey?.questions?.length) {
      const sorted = [...survey.questions].sort(
        (a, b) => a.order - b.order,
      );
      sorted.forEach((q) => {
        const questionGroup = SurveyFormGroup.createQuestionFormGroup(
          q.text,
          q.allowMultipleChoices,
        );
        const optionsArray = questionGroup.get("options") as FormArray;

        if (q.options?.length) {
          const sortedOptions = [...q.options].sort(
            (a, b) => a.order - b.order,
          );
          sortedOptions.forEach((opt) => {
            optionsArray.push(
              SurveyFormGroup.createOptionFormGroup(opt.text),
            );
          });
        } else {
          optionsArray.push(SurveyFormGroup.createOptionFormGroup(null));
          optionsArray.push(SurveyFormGroup.createOptionFormGroup(null));
        }

        this.questionsFormArray.push(questionGroup);
      });
    } else {
      this.addQuestion();
    }

    if (!isDraft) {
      this.get("title")!.disable();
      this.get("slug")!.disable();
      this.questionsFormArray.disable();
    }
  }

  addQuestion(): void {
    if (!this.canAddQuestion) {
      return;
    }

    const questionGroup = SurveyFormGroup.createQuestionFormGroup(null, false);
    const optionsArray = questionGroup.get("options") as FormArray;
    optionsArray.push(SurveyFormGroup.createOptionFormGroup(null));
    optionsArray.push(SurveyFormGroup.createOptionFormGroup(null));
    this.questionsFormArray.push(questionGroup);
  }

  removeQuestion(questionIndex: number): void {
    if (!this.canRemoveQuestion) {
      return;
    }

    this.questionsFormArray.removeAt(questionIndex);
  }

  moveQuestionUp(questionIndex: number): void {
    if (questionIndex <= 0) {
      return;
    }

    this.swapFormArrayItems(this.questionsFormArray, questionIndex, questionIndex - 1);
  }

  moveQuestionDown(questionIndex: number): void {
    if (questionIndex >= this.questionsCount - 1) {
      return;
    }

    this.swapFormArrayItems(this.questionsFormArray, questionIndex, questionIndex + 1);
  }

  getOptionsFormArray(questionIndex: number): FormArray {
    return this.questionsFormArray.at(questionIndex).get("options") as FormArray;
  }

  getOptionsCount(questionIndex: number): number {
    return this.getOptionsFormArray(questionIndex).controls.length;
  }

  canAddOption(questionIndex: number): boolean {
    return this.getOptionsCount(questionIndex) < SurveyFormGroup.MAX_OPTIONS;
  }

  canRemoveOption(questionIndex: number): boolean {
    return this.getOptionsCount(questionIndex) > SurveyFormGroup.MIN_OPTIONS;
  }

  addOption(questionIndex: number): void {
    if (!this.canAddOption(questionIndex)) {
      return;
    }

    this.getOptionsFormArray(questionIndex).push(
      SurveyFormGroup.createOptionFormGroup(null),
    );
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    if (!this.canRemoveOption(questionIndex)) {
      return;
    }

    this.getOptionsFormArray(questionIndex).removeAt(optionIndex);
  }

  moveOptionUp(questionIndex: number, optionIndex: number): void {
    if (optionIndex <= 0) {
      return;
    }

    const options = this.getOptionsFormArray(questionIndex);
    this.swapFormArrayItems(options, optionIndex, optionIndex - 1);
  }

  moveOptionDown(questionIndex: number, optionIndex: number): void {
    const options = this.getOptionsFormArray(questionIndex);
    if (optionIndex >= options.length - 1) {
      return;
    }

    this.swapFormArrayItems(options, optionIndex, optionIndex + 1);
  }

  getOptionTextField(questionIndex: number, optionIndex: number): AbstractControl {
    return this.getOptionsFormArray(questionIndex)
      .at(optionIndex)
      .get("text") as AbstractControl;
  }

  getQuestionTextField(questionIndex: number): AbstractControl {
    return this.questionsFormArray.at(questionIndex).get("text") as AbstractControl;
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

    const questions = this.questionsFormArray.controls.map((qCtrl, qi) => {
      const optionsArray = qCtrl.get("options") as FormArray;
      return {
        text: qCtrl.get("text")?.value as string,
        order: qi,
        allowMultipleChoices: qCtrl.get("allowMultipleChoices")?.value as boolean,
        options: optionsArray.controls.map((c) => c.get("text")?.value as string),
      };
    });

    return {
      title: this.get("title")?.value as string,
      description: (this.get("description")?.value as string) || undefined,
      slug: this.get("slug")?.value as string,
      questions,
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

    const questions = this.questionsFormArray.controls.map((qCtrl, qi) => {
      const optionsArray = qCtrl.get("options") as FormArray;
      return {
        text: qCtrl.get("text")?.value as string,
        order: qi,
        allowMultipleChoices: qCtrl.get("allowMultipleChoices")?.value as boolean,
        options: optionsArray.controls.map((c, oi) => ({
          text: c.get("text")?.value as string,
          order: oi,
        })),
      };
    });

    return {
      title: this.get("title")?.value as string,
      description,
      slug: this.get("slug")?.value as string,
      questions,
    };
  }

  private swapFormArrayItems(
    array: FormArray,
    indexA: number,
    indexB: number,
  ): void {
    const controlA = array.at(indexA);
    const controlB = array.at(indexB);
    const valueA = controlA.value;
    controlA.setValue(controlB.value);
    controlB.setValue(valueA);
  }

  private static createQuestionFormGroup(
    text: string | null,
    allowMultipleChoices: boolean,
  ): FormGroup {
    return new FormGroup({
      text: new FormControl(text, [
        Validators.required,
        Validators.maxLength(500),
      ]),
      allowMultipleChoices: new FormControl(allowMultipleChoices),
      options: new FormArray([] as FormGroup[]),
    });
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
