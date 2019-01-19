import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Header } from 'react-navigation';
import SwipeList from '../../Common/SwipeList/SwipeList';
import { User } from '../../Entity/User';
import { Screens } from '../../Screens';
import { green, grey } from '../../theme/colors';
import { uuid } from '../../util/uuid';
import { IRegisterEntry } from '../Register/RegisterOperations';
import { IRegister } from '../RegisterListOperations';
import moment from 'moment';

export interface IRegistrationScreenProps {
    users: User[];
    onSignInUser: (entry: IRegisterEntry) => void;
    register: IRegister;
    navigation: any;
}

export interface IRegistrationScreenState {
    query: string;
    isDateTimePickerVisible: boolean;
    user?: User;
}

export default class SearchUsers extends React.Component<IRegistrationScreenProps, IRegistrationScreenState> {

    constructor(props: IRegistrationScreenProps) {
        super(props);
        this.state = {
            query: '',
            isDateTimePickerVisible: false
        };
    }

    public render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'
                                  keyboardVerticalOffset={Header.HEIGHT + 10}>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    mode='time'
                />
                <View>
                    <FormLabel>Search for existing members</FormLabel>
                    <FormInput
                        onChangeText={this.handleOnSearch}
                        containerStyle={{ borderBottomColor: grey.grey200, borderBottomWidth: 1 }}
                    />
                    <SwipeList
                        dataSource={this.getDataSource}
                        swipeButtons={[]}
                        onPressRow={() => console.log('')}
                        header={{
                            chevron: false,
                            button: {
                                title: 'Sign In',
                                backgroundColor: green.green600,
                                onPress: (user) => this.showDateTimePicker(user),
                                borderRadius: 5,
                                containerViewStyle: { width: 100, height: 30 },
                                buttonStyle: { padding: 5 }
                            }
                        }}
                    />
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

    private get getDataSource() {
        const { query } = this.state;
        if (query) {
            return this.props.users
                .filter((user: User) => user.fullName.indexOf(query) !== -1)
                .map((user: User) => ({
                    id: user.id,
                    text: user.fullName,
                    data: user
                }));
        }
        return [];
    }

    private handleOnClose = () => {
        this.props.navigation.navigate(Screens.REGISTER);
    };

    private showDateTimePicker = (user: User) => this.setState({ isDateTimePickerVisible: true, user });

    private hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false, user: undefined });

    private handleDatePicked = (selectedDate: Date) => {
        const { register } = this.props;
        const { user } = this.state;
        const { date } = register;
        let entry = moment();
        entry.set({
            date: date.date(),
            month: date.month(),
            year: date.year(),
            hours: selectedDate.getHours(),
            minutes: selectedDate.getMinutes(),
            seconds: selectedDate.getSeconds()
        });
        this.props.onSignInUser({
            parentId: register.id,
            id: uuid(),
            fullName: user!.fullName,
            entry
        });
        this.hideDateTimePicker();
        this.props.navigation.navigate(Screens.REGISTER);
    };
}


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