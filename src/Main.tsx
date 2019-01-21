import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import AllergiesFormConnected from './Admin/AddUserForm/AllergiesForm/AllergiesFormConnected';
import BasicDetailsForm from './Admin/AddUserForm/BasicDetailsForm/BasicDetailsForm';
import EmergencyContactForm from './Admin/AddUserForm/EmergencyContactForm/EmergencyContactForm';
import AdminConnected from './Admin/AdminConnected';
import UserProfile from './Admin/UserProfile';
import { firebaseApp } from './App';
import Loading from './Auth/Loading';
import LoginAuth from './Auth/LoginAuth';
import SignUp from './Auth/SignUp';
import RegisterConnected from './Registration/Register/RegisterConnected';
import RegisterListConnected from './Registration/RegisterListConnected';
import SearchUsersConnected from './Registration/SearchModal/SearchUsersConnected';
import AllergiesConnected from './Reports/Allergies/AllergiesConnected';
import AttendancesConnected from './Reports/Attendances/AttendancesConnected';
import ReportsConnected from './Reports/ReportsConnected';
import { Screens } from './Screens';
import { blue, grey, red, teal, white } from './theme/theme';

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
                <Button
                    title='Logout'
                    backgroundColor={red.red700}
                    onPress={this.handleLogout}
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

    private handleLogout = async () => {
        await firebaseApp.auth().signOut();
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        height: '100%'
    },
    icon: {
        position: 'absolute',
        right: 10,
        bottom: 10
    }
});

const AuthFlow = createSwitchNavigator({
    [Screens.LOADING]: Loading,
    [Screens.SIGN_UP]: SignUp,
    [Screens.LOGIN]: LoginAuth
});

const MainFlow = createStackNavigator({
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

const AppNavigator = createSwitchNavigator({
        authFlow: AuthFlow,
        mainFlow: MainFlow
    });

export const AppNavigation = createAppContainer(AppNavigator);