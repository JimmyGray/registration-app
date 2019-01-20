import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AllergiesFormConnected from './Admin/AddUserForm/AllergiesForm/AllergiesFormConnected';
import BasicDetailsForm from './Admin/AddUserForm/BasicDetailsForm/BasicDetailsForm';
import EmergencyContactForm from "./Admin/AddUserForm/EmergencyContactForm/EmergencyContactForm";
import AdminConnected from './Admin/AdminConnected';
import UserProfile from "./Admin/UserProfile";
import RegisterConnected from './Registration/Register/RegisterConnected';
import RegisterListConnected from './Registration/RegisterListConnected';
import SearchUsersConnected from './Registration/SearchModal/SearchUsersConnected';
import AllergiesConnected from './Reports/Allergies/AllergiesConnected';
import AttendancesConnected from './Reports/Attendances/AttendancesConnected';
import ReportsConnected from './Reports/ReportsConnected';
import { Screens } from './Screens';
import { blue, grey, teal, white } from './theme/theme';

export interface IAppProps {
    navigation: any;
}

class Main extends React.Component<IAppProps> {

    public static navigationOptions = {
        header: null
    };

    public render() {
        return (
            <View style={styles.container}>
                <Button
                    icon={{ name: 'event', type: 'simple-line-icon' }}
                    backgroundColor={blue.blue600}
                    title='Guest Book'
                    onPress={() => this.props.navigation.navigate(Screens.REGISTER_LIST)}
                    style={styles.button}
                />
                <Button
                    icon={{ name: 'notebook', type: 'simple-line-icon' }}
                    title='Reports'
                    backgroundColor={teal.teal600}
                    onPress={() => this.props.navigation.navigate(Screens.REPORTS)}
                    buttonStyle={styles.button}
                />
                <Icon
                    raised={true}
                    name='person'
                    reverse={true}
                    color={grey.grey500}
                    containerStyle={styles.icon}
                    onPress={() => this.props.navigation.navigate(Screens.ADMIN)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        marginTop: 10,
        marginBottom: 10
    },
    icon: {
        position: 'absolute',
        right: 10,
        bottom: 10
    }
});

const AppNavigator = createStackNavigator({
    [Screens.MAIN]: Main,
    [Screens.REPORTS]: ReportsConnected,
    [Screens.REGISTER_LIST]: RegisterListConnected,
    [Screens.REGISTER]: RegisterConnected,
    [Screens.ADMIN]: AdminConnected,
    [Screens.ADD_USER_BASIC]: BasicDetailsForm,
    [Screens.USER_PROFILE]: UserProfile,
    [Screens.ADD_USER_EMERGENCY_CONTACT]: EmergencyContactForm,
    [Screens.ADD_USER_ALLERGIES]: AllergiesFormConnected,
    [Screens.SEARCH_USER]: SearchUsersConnected,
    [Screens.ALLERGIES]: AllergiesConnected,
    [Screens.ATTENDANCES]: AttendancesConnected
});

export const AppNavigation = createAppContainer(AppNavigator);