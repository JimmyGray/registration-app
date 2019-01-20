import { Allergy } from '../Admin/AddUserForm/AllergiesForm/AllergiesForm';
import { uuid } from '../util/uuid';

export class User {
    public constructor(
        public readonly id: string = uuid(),
        public readonly firstName: string = '',
        public readonly surname: string = '',
        public readonly emergencyContact: string = '',
        public readonly allergies: Allergy[] = []
    ) {}

    public cloneWithProps(props: Partial<User>) {
        return Object.assign(this, props);
    }

    public get fullName() {
        return `${this.firstName} ${this.surname}`
    }

    public isValid() {
        return this.firstName && this.surname;
    }
}