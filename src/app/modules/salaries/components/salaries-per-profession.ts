import { CompanyType } from "@models/salaries/company-type";
import { UserSalary } from "@models/salaries/salary.model";
import { UserProfession } from "@models/salaries/user-profession";
import { SplittedByWhitespacesString } from "@shared/value-objects/splitted-by-whitespaces-string";

export class SalariesPerProfession {

    readonly professionName: string;
    turnedOn: boolean = false;

    constructor(
        readonly profession: UserProfession,
        readonly items: Array<UserSalary>) {
        this.professionName = new SplittedByWhitespacesString(UserProfession[profession]).toString();
    }

    toggle(): void {
        this.turnedOn = !this.turnedOn;
    }

    static from(salaries: Array<UserSalary>): {
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

        var uniqueProfessionsForLocal = [...new Set(localSalaries.map(x => x.profession))];
        var uniqueProfessionsForRemote = [...new Set(remoteSalaries.map(x => x.profession))];

        console.log(uniqueProfessionsForLocal);
        console.log(uniqueProfessionsForRemote);

        const local = uniqueProfessionsForLocal.map(x => {
            const filteredSalaries = localSalaries.filter(salary => salary.profession == x);
            return new SalariesPerProfession(x, filteredSalaries);
        });

        const remote = uniqueProfessionsForRemote.map(x => {
            const filteredSalaries = remoteSalaries.filter(salary => salary.profession == x);
            return new SalariesPerProfession(x, filteredSalaries);
        });

        return {
            local: local.sort((a, b) => a.items.length > b.items.length ? -1 : 1),
            remote: remote.sort((a, b) => a.items.length > b.items.length ? -1 : 1),
        };
    }
}
