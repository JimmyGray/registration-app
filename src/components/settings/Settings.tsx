import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { firebaseApp } from '../../App';
import { red } from '../../theme/theme';

export interface ISettingsProps {}

export default class Settings extends React.Component<ISettingsProps> {

    public static navigationOptions = {
        title: 'Settings'
    };

    public render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Button title='Logout' onPress={this.handleLogout} backgroundColor={red.red700}/>
            </View>
        );
    }

    private handleLogout = async () => {
        await firebaseApp.auth().signOut();
    };
}