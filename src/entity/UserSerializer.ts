import { EmergencyContact } from './EmergencyContact';
import { User } from './User';

export class UserSerializer {
    public static toUser(payload: User) {
        let user: User = new User(payload);
        if (payload.emergencyContact) {
            const emergencyContact: EmergencyContact = new EmergencyContact({
                ...payload.emergencyContact
            });
            user = user.cloneWithProps({ emergencyContact });
        }
        return user;
    }
}