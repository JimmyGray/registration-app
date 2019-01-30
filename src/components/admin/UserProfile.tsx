import { capitalize } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { EmergencyContact } from '../../entity/EmergencyContact';
import { User } from '../../entity/User';
import { IRegisterEntry } from '../registration/Register/RegisterOperations';
import { Allergy } from './AddUserForm/AllergiesForm/AllergiesForm';

export interface IAdminProps {
    navigation: any;
}

export default class UserProfile extends React.Component<IAdminProps> {

    public static navigationOptions = {
        title: 'User Profile'
    };

    public render() {
        const { navigation } = this.props;
        const user: User = navigation.getParam('user', new User({}));
        const registerEntries: IRegisterEntry[] = navigation.getParam('registerEntries', []);
        const attendances: number = registerEntries
            .filter(entry => entry.fullName === user.fullName)
            .length;
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text h4={true}>{user.fullName}</Text>
                {this.getEmergencyContactName(user.emergencyContact)}
                {this.getEmergencyContactNumber(user.emergencyContact)}
                {this.getAllergies(user.allergies)}
                <Text>Attendances: {attendances}</Text>
            </View>
        );
    }

    private getEmergencyContactName(emergencyContact: EmergencyContact) {
        if (emergencyContact) {
            return <Text>Emergency Contact Name: {emergencyContact.contactName}</Text>;
        }
        return null;
    }

    private getEmergencyContactNumber(emergencyContact: EmergencyContact) {
        if (emergencyContact) {
            return <Text>Emergency Contact Number: {emergencyContact.contactNumber}</Text>;
        }
        return null;
    }

    private getAllergies(allergies: Allergy[]) {
        const allergiesFormatted: string[] = allergies.map(x => capitalize(x));
        if (allergiesFormatted.length) {
            return <Text>Allergies: {allergiesFormatted.join(', ')}</Text>;
        }
        return null;
    }
}