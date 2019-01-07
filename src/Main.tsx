import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AddUserFormConnected from './Admin/AddUserForm/AddUserFormConnected';
import AdminConnected from './Admin/AdminConnected';
import RegisterConnected from './Registration/Register/RegisterConnected';
import RegisterListConnected from './Registration/RegisterListConnected';
import SearchUsersConnected from './Registration/SearchModal/SearchUsersConnected';
import { Screens } from './Screens';
import { blue, grey, teal, white } from './theme/colors';

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
                    onPress={() => this.props.navigation.navigate(Screens.ADMIN)}
                    buttonStyle={styles.button}
                />
                <Icon
                    raised={true}
                    name='person'
                    type='simple-line-icon'
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
    [Screens.REGISTER_LIST]: RegisterListConnected,
    [Screens.REGISTER]: RegisterConnected,
    [Screens.ADMIN]: AdminConnected,
    [Screens.ADD_USER_FORM]: AddUserFormConnected,
    [Screens.SEARCH_USER]: SearchUsersConnected
});

export const AppNavigation = createAppContainer(AppNavigator);