import moment from 'moment';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SwipeList from '../common/SwipeList/SwipeList';
import { Screens } from '../../Screens';
import { green, red } from '../../theme/theme';
import { dateFormatter } from '../../util/formatter';
import { IRegister } from './RegisterListOperations';

export interface IRegisterListProps {
    registerList: IRegister[];
    addRegister: (date: number) => void;
    removeRegister: (id: string) => void;
    selectRegister: (register: IRegister) => void;
    navigation: any;
}

export interface IRegisterListState {
    isDateTimePickerVisible: boolean;
}

export default class RegisterList extends React.Component<IRegisterListProps, IRegisterListState> {

    public static navigationOptions = {
        title: 'Register List'
    };

    constructor(props: IRegisterListProps) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
        }
    }

    public render() {
        return (
            <View style={styles.container}>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
                <SwipeList
                    dataSource={this.getDataSource}
                    swipeButtons={this.getSwipeButtons}
                    onPressRow={this.onPressRow}
                    header={{
                        chevron: true
                    }}
                />
                <View>
                    <Button title='Add' onPress={this.showDateTimePicker} backgroundColor={green.green700}/>
                </View>
            </View>
        );
    }

    private showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    private hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    private handleDatePicked = (selectedDate: Date) => {
        const date: moment.Moment = moment(selectedDate);
        const canAddDate: boolean = this.props.registerList.every((register: IRegister) => moment(register.date).toDate().getUTCDate() !== date.toDate().getUTCDate());
        if (canAddDate) {
            this.props.addRegister(date.valueOf());
        }
        this.hideDateTimePicker();
    };

    private onPressRow = (register: IRegister) => {
        this.props.selectRegister(register);
        this.props.navigation.navigate(Screens.REGISTER);
    }

    private get getDataSource() {
        return this.props.registerList
            .sort((a: IRegister, b: IRegister) => a.date.valueOf() - b.date.valueOf())
            .map((register: IRegister) => ({ id: register.id, text: dateFormatter(register.date), data: register }));
    }

    private get getSwipeButtons() {
        return [{
            text: 'Delete',
            backgroundColor: red.red700,
            onPress: (id: string) => this.props.removeRegister(id)
        }]
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    listContainer: {
        marginBottom: 10,
        marginTop: 0
    }
});