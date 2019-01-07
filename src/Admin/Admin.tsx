import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import List, { IListItem } from '../Common/List/List';
import { User } from '../Entity/User';
import { Screens } from '../Screens';
import { blue, red } from '../theme/colors';

export interface IAdminProps {
    users: User[];
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
                <List items={this.getListItems()}/>
                <Icon
                    raised={true}
                    name='add'
                    color={blue.blue600}
                    reverse={true}
                    containerStyle={styles.icon}
                    onPress={() => this.props.navigation.navigate(Screens.ADD_USER_FORM)}/>
            </View>
        );
    }

    private getTitle() {
        if (!this.props.users.length) {
            return <View style={styles.noUsers}><Text>No Users Added</Text></View>;
        }
        return null;
    }

    private getListItems(): IListItem[] {
        return this.props.users.map((user: User) => {
           return {
               key: user.fullName,
               title: user.fullName,
               body: <Button title='Remove' backgroundColor={red.red600} onPress={() => this.onRemove(user.id)}
               />
           }
        });
    }

    private onRemove(id: string) {
        this.props.onRemoveUser(id);
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