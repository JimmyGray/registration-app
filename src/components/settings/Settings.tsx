import React from 'react';
import { View } from 'react-native';
import { CheckBox, FormLabel, normalize } from 'react-native-elements';
import { ISettings } from '../../store/createStore';
import { Setting } from './SettingsOperations';

export interface ISettingsProps {
    settings: ISettings;
    onSettingToggle: (setting: Setting) => void;
}

export default class Settings extends React.Component<ISettingsProps> {

    public static navigationOptions = {
        title: 'Settings'
    };

    public render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <FormLabel>Register Options</FormLabel>
                <CheckBox
                    title='Sign In guests automatically (uses current time)'
                    checked={this.props.settings.autoSignIn}
                    onPress={this.handleOnToggle.bind(this, Setting.AUTO_SIGN_IN)}
                />
                <CheckBox
                    title='Sign Out guests automatically (uses current time)'
                    checked={this.props.settings.autoSignOut}
                    onPress={this.handleOnToggle.bind(this, Setting.AUTO_SIGN_OUT)}
                />
            </View>
        );
    }

    private handleOnToggle = (setting: Setting) => {
        this.props.onSettingToggle(setting);
    };
}
