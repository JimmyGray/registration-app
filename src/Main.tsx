import { Asset } from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, normalize, Text } from 'react-native-elements';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AllergiesFormConnected from './components/admin/AddUserForm/AllergiesForm/AllergiesFormConnected';
import BasicDetailsForm from './components/admin/AddUserForm/BasicDetailsForm/BasicDetailsForm';
import EmergencyContactForm from './components/admin/AddUserForm/EmergencyContactForm/EmergencyContactForm';
import AdminConnected from './components/admin/AdminConnected';
import UserProfile from './components/admin/UserProfile';
import { IIcon } from './components/common/List/ListHeader';
import RegisterConnected from './components/registration/Register/RegisterConnected';
import RegisterListConnected from './components/registration/RegisterListConnected';
import SearchUsersConnected from './components/registration/SearchModal/SearchUsersConnected';
import AllergiesConnected from './components/reports/Allergies/AllergiesConnected';
import AttendancesConnected from './components/reports/Attendances/AttendancesConnected';
import ReportsConnected from './components/reports/ReportsConnected';
import SettingsConnected from './components/settings/SettingsConnected';
import { Screens } from './Screens';
import { blue, getStatusBarHeight, spacing, white } from './theme/theme';

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
      <Icon name={props.icon.name}
            type={props.icon.type}
            size={40}
            iconStyle={{ color: white, padding: 0, margin: 0 }}
      />
      <View style={styles.mainMenuButtonTextContainer}>
          <Text h4={true} style={{ color: white }}>{props.title}</Text>
          <Text style={{ color: white }}>{props.subtitle}</Text>
      </View>
  </View>
);

class Main extends React.Component<IAppProps> {

    public static navigationOptions = {
        header: null
    };

    public async componentWillMount() {
        await Asset.loadAsync([
            require('../assets/icons/milk.png'),
            require('../assets/icons/almond.png'),
            require('../assets/icons/gluten.png'),
            require('../assets/icons/egg.png'),
            require('../assets/icons/fish.png'),
        ]);
    }

    public render() {
        return (
            <View style={styles.container}>
                <MainMenuButton
                    title={'Guest Book'}
                    subtitle={'Create Registers'}
                    icon={{ name: 'event', type: 'simple-line-icon' }}
                    backgroundColor={blue.blue200}
                    onPress={() => this.props.navigation.navigate(Screens.REGISTER_LIST)}
                />
                <MainMenuButton
                    title={'Reports'}
                    subtitle={'View Generated Reports'}
                    icon={{ name: 'notebook', type: 'simple-line-icon' }}
                    backgroundColor={blue.blue400}
                    onPress={() => this.props.navigation.navigate(Screens.REPORTS)}
                />
                <MainMenuButton
                    title={'Members'}
                    subtitle={'View and Edit Members'}
                    icon={{ name: 'person' }}
                    backgroundColor={blue.blue600}
                    onPress={() => this.props.navigation.navigate(Screens.ADMIN)}
                />
                <MainMenuButton
                    title={'Settings'}
                    subtitle={'Change Application Settings'}
                    icon={{ name: 'settings' }}
                    backgroundColor={blue.blue800}
                    onPress={() => this.props.navigation.navigate(Screens.SETTINGS)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: getStatusBarHeight()
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0,
        justifyContent: 'center'
    },
    mainMenuButtonContainer: {
        height: '25%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '10%'
    },
    mainMenuButtonTextContainer: {
        marginTop: normalize(spacing.xxSmall),
        marginLeft: normalize(spacing.xxSmall),
    }
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
    [Screens.ATTENDANCES]: AttendancesConnected,
    [Screens.SETTINGS]: SettingsConnected,
});

export const AppNavigation = createAppContainer(MainFlow);