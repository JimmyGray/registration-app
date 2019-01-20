import React from 'react';
import { View } from 'react-native';
import { User } from '../Entity/User';
import { IRegisterEntry } from "../Registration/Register/RegisterOperations";
import { Text } from 'react-native-elements';
import { Allergy } from "./AddUserForm/AllergiesForm/AllergiesForm";

export interface IAdminProps {
    navigation: any;
}

export default class UserProfile extends React.Component<IAdminProps> {

    public static navigationOptions = {
        title: 'User Profile',
    };

    public render() {
        const { navigation } = this.props;
        const user: User = navigation.getParam('user', new User());
        const registerEntries: Array<IRegisterEntry> = navigation.getParam('registerEntries', []);
        const attendances: number = registerEntries
            .filter(entry => entry.fullName === user.fullName)
            .length;
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text h4={true}>{user.fullName}</Text>
                {this.getEmergencyContact(user.emergencyContact)}
                {this.getAllergies(user.allergies)}
                <Text>Attendances: {attendances}</Text>
            </View>
        );
    }

    private getEmergencyContact(emergencyContact: string) {
        if (emergencyContact) {
            return <Text>Emergency Contact: {emergencyContact}</Text>
        }
        return null;
    }

    private getAllergies(allergies: Array<Allergy>) {
        if (allergies.length) {
            return <Text>Allergies: {allergies.join(', ')}</Text>
        }
        return null;
    }
}