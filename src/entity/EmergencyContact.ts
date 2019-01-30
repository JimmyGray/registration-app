import { isEmpty } from 'lodash';

export class EmergencyContact {
    public readonly contactName: string = '';
    public readonly contactNumber: string = '';

    public constructor(props: Partial<EmergencyContact>) {
        return Object.assign(this, props);
    }

    public cloneWithProps(props: Partial<EmergencyContact>) {
        return new EmergencyContact(Object.assign(this, props));
    }

    public isValid(): boolean {
        return !isEmpty(this.contactNumber) && !isEmpty(this.contactName);
    }
}