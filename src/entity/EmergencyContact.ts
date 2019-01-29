import { isEmpty } from 'lodash';

export class EmergencyContact {
    public constructor(public readonly contactName: string = '',
                       public readonly contactNumber: string = '') {}

    public cloneWithProps(props: Partial<EmergencyContact>) {
        return Object.assign(this, props);
    }

    public isValid(): boolean {
        return !isEmpty(this.contactNumber) && !isEmpty(this.contactName);
    }
}