import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import SwipeList from '../Common/SwipeList/SwipeList';
import { User } from '../Entity/User';
import { Screens } from '../Screens';
import { blue, grey, red } from '../theme/theme';
import { IRegisterEntry } from "../Registration/Register/RegisterOperations";

export interface IAdminProps {
    onEditUser: (id: string) => void;
    users: User[];
    registerEntries: IRegisterEntry[];
    onRemoveUser: (id: string) => void;
    navigation: any;
}

export default class Admin extends React.Component<IAdminProps> {

    public static navigationOptions = {
        title: 'Admin',
    };

    public render() {
        return (
            <View style={{ flex: 1 }}>
                {this.getTitle()}
                <SwipeList
                    dataSource={this.getDataSource}
                    swipeButtons={this.getSwipeButtons}
                    onPressRow={this.handleOnRowPress}
                    header={{ chevron: true }}
                />
                <Icon
                    raised={true}
                    name='add'
                    color={blue.blue600}
                    reverse={true}
                    containerStyle={styles.icon}
                    onPress={() => this.props.navigation.navigate(Screens.ADD_USER_BASIC, { user: new User() })}/>
            </View>
        );
    }

    private handleOnRowPress = (user: User) => {
        const { registerEntries } = this.props;
        this.props.navigation.navigate(Screens.USER_PROFILE, { user, registerEntries });
    }

    private getTitle() {
        if (!this.props.users.length) {
            return <View style={styles.noUsers}><Text>No Users Added</Text></View>;
        }
        return null;
    }

    private onRemove(id: string) {
        this.props.onRemoveUser(id);
    }

    private onEdit(id: string) {
        const user: User | undefined = this.props.users.find(user => user.id === id);
        if (user) {
            this.props.navigation.navigate(Screens.ADD_USER_BASIC, { user });
        }
    }

    private get getDataSource() {
        return this.props.users.map((user: User) =>
            ({ id: user.id, text: user.fullName, data: user }));
    }

    private get getSwipeButtons() {
        return [
            {
                text: 'Edit',
                backgroundColor: grey.grey300,
                onPress: (id) => this.onEdit(id)
            },
            {
                text: 'Delete',
                backgroundColor: red.red700,
                onPress: (id) => this.onRemove(id)
            },
        ]
    }
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    noUsers: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});