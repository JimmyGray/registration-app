import moment from 'moment';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, FormInput, FormLabel, normalize } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SwipeList from '../../common/SwipeList/SwipeList';
import { User } from '../../../entity/User';
import { Screens } from '../../../Screens';
import { green, grey, keyboardAVWithHeader, red } from '../../../theme/theme';
import { uuid } from '../../../util/uuid';
import { IRegisterEntry } from '../Register/RegisterOperations';
import { IRegister } from '../RegisterListOperations';

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
            <KeyboardAvoidingView style={styles.container}
                                  behavior='padding'
                                  keyboardVerticalOffset={keyboardAVWithHeader}>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    mode='time'
                />
                <View>
                    <FormLabel>Search for members</FormLabel>
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
                                backgroundColor: green.green700,
                                onPress: (user) => this.showDateTimePicker(user),
                                borderRadius: 5,
                                containerViewStyle: { width: normalize(110), height: normalize(30), justifyContent: 'center' },
                                buttonStyle: { padding: normalize(5) }
                            }
                        }}
                    />
                </View>
                <View>
                    <Button
                        title='Close'
                        backgroundColor={red.red700}
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
                .filter((user: User) => user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1)
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
        const currentDate = moment(date);
        const entryMoment = moment();
        entryMoment.set({
            date: currentDate.date(),
            month: currentDate.month(),
            year: currentDate.year(),
            hours: selectedDate.getHours(),
            minutes: selectedDate.getMinutes(),
            seconds: selectedDate.getSeconds()
        });
        this.props.onSignInUser({
            parentId: register.id,
            id: uuid(),
            fullName: user!.fullName,
            entry: entryMoment.valueOf()
        });
        this.hideDateTimePicker();
        this.props.navigation.navigate(Screens.REGISTER);
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: normalize(10)
    },
    listItemContainer: {
        justifyContent: 'center'
    }
});