import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, normalize, Text } from 'react-native-elements';
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
import { IIcon } from './Common/List/ListHeader';
import RegisterConnected from './Registration/Register/RegisterConnected';
import RegisterListConnected from './Registration/RegisterListConnected';
import SearchUsersConnected from './Registration/SearchModal/SearchUsersConnected';
import AllergiesConnected from './Reports/Allergies/AllergiesConnected';
import AttendancesConnected from './Reports/Attendances/AttendancesConnected';
import ReportsConnected from './Reports/ReportsConnected';
import { Screens } from './Screens';
import { blue, getStatusBarHeight, white } from './theme/theme';

export interface IAppProps {
    navigation: any;
}

export interface IMainMenuButtonProps {
    title: string;
    subtitle: string;
    icon: IIcon;
    backgroundColor: any;
    onPress: any;
}

export const MainMenuButton = (props: IMainMenuButtonProps) => (
  <View style={{ ...styles.mainMenuButtonContainer, backgroundColor: props.backgroundColor }}
        onTouchStart={props.onPress}>
      <Icon name={props.icon.name} type={props.icon.type} size={normalize(40)}
            iconStyle={styles.icon}/>
      <View style={styles.mainMenuButtonTextContainer}>
          <Text h4={true} style={styles.text}>{props.title}</Text>
          <Text style={styles.text}>{props.subtitle}</Text>
      </View>
  </View>
);

class Main extends React.Component<IAppProps> {

    public static navigationOptions = {
        header: null
    };

    public render() {
        return (
            <View style={styles.container}>
                <MainMenuButton
                    title={'Guest Book'}
                    subtitle={'Create guest books and sign in users'}
                    icon={{ name: 'event', type: 'simple-line-icon' }}
                    backgroundColor={blue.blue200}
                    onPress={() => this.props.navigation.navigate(Screens.REGISTER_LIST)}
                />
                <MainMenuButton
                    title={'Reports'}
                    subtitle={'View generated reports'}
                    icon={{ name: 'notebook', type: 'simple-line-icon' }}
                    backgroundColor={blue.blue400}
                    onPress={() => this.props.navigation.navigate(Screens.REPORTS)}
                />
                <MainMenuButton
                    title={'Users'}
                    subtitle={'Create and edit users'}
                    icon={{ name: 'person' }}
                    backgroundColor={blue.blue600}
                    onPress={() => this.props.navigation.navigate(Screens.ADMIN)}
                />
                <MainMenuButton
                    title={'Logout'}
                    subtitle={''}
                    icon={{ name: 'logout', type: 'simple-line-icon' }}
                    backgroundColor={blue.blue800}
                    onPress={this.handleLogout}
                />
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
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: getStatusBarHeight()
    },
    button: {
        height: normalize(134),
        display: 'flex',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0,
        justifyContent: 'center'
    },
    mainMenuButtonContainer: {
        height: normalize(134),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainMenuButtonTextContainer: {
        flex: 1
    },
    icon: {
        color: white,
        marginRight:normalize(20),
        marginLeft: normalize(40)
    },
    text: {
        color: white,
        textAlign: 'left'
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