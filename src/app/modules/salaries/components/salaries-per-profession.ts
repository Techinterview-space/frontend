import { CompanyType } from "@models/salaries/company-type";
import { UserSalary } from "@models/salaries/salary.model";
import { LabelEntityDto } from "@services/label-entity.model";

export class SalariesPerProfession {

    turnedOn: boolean = false;

    constructor(
        readonly profession: number | null,
        readonly items: Array<UserSalary>,
        readonly professionName: string) {}

    toggle(): void {
        this.turnedOn = !this.turnedOn;
    }

    static from(salaries: Array<UserSalary>, professions: Array<LabelEntityDto>): {
        local: Array<SalariesPerProfession>,
        remote: Array<SalariesPerProfession>
    } {

        const localSalaries: Array<UserSalary> = [];
        const remoteSalaries: Array<UserSalary> = [];

        for (let index = 0; index < salaries.length; index++) {
            const salary = salaries[index];
            if (salary.company == CompanyType.Local) {
                localSalaries.push(salary);
            } else {
                remoteSalaries.push(salary);
            }
        }

        var uniqueProfessionsForLocal = [...new Set(localSalaries.map(x => x.professionId))];
        var uniqueProfessionsForRemote = [...new Set(remoteSalaries.map(x => x.professionId))];

        const local = uniqueProfessionsForLocal.map(x => {
            const filteredSalaries = localSalaries.filter(salary => salary.professionId == x);
            return new SalariesPerProfession(x, filteredSalaries, professions.find(p => p.id == x)?.title || '');
        });

        const remote = uniqueProfessionsForRemote.map(x => {
            const filteredSalaries = remoteSalaries.filter(salary => salary.professionId == x);
            return new SalariesPerProfession(x, filteredSalaries, professions.find(p => p.id == x)?.title || '');
        });

        return {
            local: local.sort((a, b) => a.items.length > b.items.length ? -1 : 1),
            remote: remote.sort((a, b) => a.items.length > b.items.length ? -1 : 1),
        };
    }
}
