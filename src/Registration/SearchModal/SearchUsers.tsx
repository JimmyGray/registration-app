import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Card, FormInput, FormLabel } from 'react-native-elements';
import { Header } from 'react-navigation';
import List, { IListItem } from '../../Common/List/List';
import { User } from '../../Entity/User';
import { Screens } from '../../Screens';
import { green, grey } from '../../theme/colors';
import { uuid } from '../../util/uuid';
import { ISignInUserAction } from '../RegisterListOperations';

export interface IRegistrationScreenProps {
    users: User[];
    onSignInUser: (entry: ISignInUserAction) => void;
    registrationId: string;
    navigation: any;
}

export interface IRegistrationScreenState {
    query: string;
}

export interface ISearchListItemProps {
    user: User;
    onSignInUser: (user: User) => void;
}

export default class SearchUsers extends React.Component<IRegistrationScreenProps, IRegistrationScreenState> {

    constructor(props: IRegistrationScreenProps) {
        super(props);
        this.state = {
            query: ''
        };
    }

    public render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'
                                  keyboardVerticalOffset={Header.HEIGHT + 30}>
                <View>
                    <FormLabel>Search for existing members</FormLabel>
                    <FormInput
                        onChangeText={this.handleOnSearch}
                        containerStyle={{ borderBottomColor: grey.grey200, borderBottomWidth: 1 }}
                    />
                    <List items={this.getFilteredUsers()} />
                </View>
                <View>
                    <Button
                        title='Close'
                        icon={{ name: 'close' }}
                        backgroundColor={grey.grey600}
                        onPress={this.handleOnClose}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }

    private handleOnSearch = (query: string) => {
        this.setState({
            query
        });
    };

    private getFilteredUsers(): IListItem[] {
        const { query } = this.state;
        if (query) {
            return this.props.users
                .filter((user: User) => user.fullName.indexOf(query) !== -1)
                .map((user: User) => ({
                    key: user.id,
                    title: user.fullName,
                    headerRight: <Button
                        title='Sign In'
                        backgroundColor={green.green600}
                        onPress={this.handleOnSignInUser.bind(this, user)}
                        borderRadius={5}
                        containerViewStyle={{ width: 100 }}
                    />
                }));
        }
        return [];
    }

    private handleOnSignInUser = (user: User) => {
        this.props.onSignInUser(
            {
                id: this.props.registrationId,
                registration: {
                    id: uuid(),
                    fullName: user.fullName,
                    entry: new Date()
                }
            });
        this.props.navigation.navigate(Screens.REGISTER);
    };

    private handleOnClose = () => {
        this.props.navigation.navigate(Screens.REGISTER);
    };
}

export const SearchListItem = (props: ISearchListItemProps) => (
    <Card title={props.user.fullName} containerStyle={styles.listItemContainer}>
        <Button
            title='SIGN IN'
            icon={{ name: 'done' }}
            backgroundColor={green.green600}
            onPress={() => props.onSignInUser(props.user)}
        />
    </Card>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    listItemContainer: {
        justifyContent: 'center'
    }
});