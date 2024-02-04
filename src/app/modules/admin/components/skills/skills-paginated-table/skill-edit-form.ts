import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateSkillRequest, Skill, SkillAdmiDto, UpdateSkillRequest } from '@services/skills.service';
import { RandomHexColor } from '@shared/value-objects/random-hex-color';

export class SkillEditForm extends FormGroup {
  private readonly itemId: number | null;
  constructor(item: SkillAdmiDto | null) {
    super({
      title: new FormControl(item?.title, [Validators.required, Validators.maxLength(50)]),
      hexColor: new FormControl(item?.hexColorAsString ?? new RandomHexColor().toString(), [
        Validators.required,
        Validators.maxLength(7)
      ]),
    });

    this.itemId = item?.id ?? null;
  }

  randomizeColor(): void {
    this.get('hexColor')?.setValue(new RandomHexColor().toString());
  }

  createRequestOrNull(): CreateSkillRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      title: this.value.title,
      hexColor: this.value.hexColor,
    };
  }

  updateRequestOrNull(): UpdateSkillRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      id: this.itemId!,
      title: this.value.title,
      hexColor: this.value.hexColor,
    };
  }
}
