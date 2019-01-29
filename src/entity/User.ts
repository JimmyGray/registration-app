import { Allergy } from '../components/admin/AddUserForm/AllergiesForm/AllergiesForm';
import { uuid } from '../util/uuid';
import { EmergencyContact } from './EmergencyContact';

export class User {

    public readonly id: string = uuid();
    public readonly firstName: string = '';
    public readonly surname: string = '';
    public readonly emergencyContact: EmergencyContact = new EmergencyContact();
    public readonly allergies: Allergy[] = [];

    public constructor(props: Partial<User>) {
        return Object.assign(this, props);
    }

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