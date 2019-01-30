import React from 'react';
import { View } from 'react-native';
import { CheckBox, normalize } from 'react-native-elements';
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
            <View style={{ flex: 1, justifyContent: 'space-between', marginBottom: normalize(10) }}>
                <CheckBox
                    title='Auto Sign out user (uses current time)'
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
