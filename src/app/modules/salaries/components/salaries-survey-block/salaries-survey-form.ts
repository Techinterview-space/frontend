import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ExpectationReplyType, SalariesStatSurveyData, UsefulnessReplyType } from "@services/salaries-survey.service";

export interface CheckboxRadioOption<TEnum> {
    value: TEnum;
    label: string;
}

export class SalariesSurveyForm extends FormGroup {

    readonly usefullnessReplyOptions: Array<CheckboxRadioOption<UsefulnessReplyType>> = [
        {
            label: "Да",
            value: UsefulnessReplyType.Yes,
        },
        {
            label: "Нет",
            value: UsefulnessReplyType.No,
        },
        {
            label: "Не знаю",
            value: UsefulnessReplyType.NotSure,
        },
    ];

    readonly expectationReplyOptions: Array<CheckboxRadioOption<ExpectationReplyType>> = [
        {
            label: "Зарплаты такие, как и предполагал(а)",
            value: ExpectationReplyType.Expected,
        },
        {
            label: "Я думал(а), что зарплаты меньше",
            value: ExpectationReplyType.MoreThanExpected,
        },
        {
            label: "Я думал(а), что зарплаты выше",
            value: ExpectationReplyType.LessThanExpected,
        },
    ];

    constructor() {
        super({
            usefulnessReply: new FormControl(null, [Validators.required]),
            expectationReply: new FormControl(null, [Validators.required]),
        });
    }

    onCheckUsefulnessReply(data: any): void {
        const value = data.target.value as UsefulnessReplyType;
        this.get("usefulnessReply")?.setValue(value);
    }

    onCheckExpectationReply(data: any): void {
        const value = data.target.value as ExpectationReplyType;
        this.get("expectationReply")?.setValue(value);
    }

    requestOrNull(): SalariesStatSurveyData | null {

        if (!this.valid) {
            this.markAllAsTouched();
            return null;
        }

        const usefulnessReply = this.get("usefulnessReply")?.value;
        const expectationReply = this.get("expectationReply")?.value;

        if (usefulnessReply == null ||
            expectationReply == null) {
            return null;
        }

        const usefulnessReplyAsEnum = Number(usefulnessReply) as UsefulnessReplyType;
        const expectationReplyAsEnum = Number(expectationReply) as ExpectationReplyType;

        return {
            usefulnessReply: usefulnessReplyAsEnum,
            expectationReply: expectationReplyAsEnum,
        };
    }
}