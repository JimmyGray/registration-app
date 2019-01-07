import { IUser } from '../store/createStore';
import { uuid } from '../util/uuid';

export class User implements IUser {
    public constructor(
        public id: string = '',
        public firstName: string = '',
        public surname: string =''
    ) {
        this.id = uuid();
        this.firstName = firstName;
        this.surname = surname;
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