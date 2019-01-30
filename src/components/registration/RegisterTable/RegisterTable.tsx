import moment from 'moment';
import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Swipeout from 'react-native-swipeout';
import { ISettings } from '../../../store/createStore';
import { grey, red, white } from '../../../theme/theme';
import { timeFormatter } from '../../../util/formatter';
import { ISwipeButton } from '../../common/SwipeList/SwipeList';
import { IRegisterEntry, ISignOutUserAction } from '../Register/RegisterOperations';
import { IRegister } from '../RegisterListOperations';
import { Row, RowType, TextColumn } from './Row';

export interface IRegisterTableProps {
    register: IRegister;
    registerEntries: IRegisterEntry[];
    onSignOutUser: (payload: ISignOutUserAction) => void;
    onDeleteEntry: (id: string) => void;
    settings: ISettings;
}

export interface IRegisterTableState {
    selectedId: string;
    isDateTimePickerVisible: boolean;
}

export default class RegisterTable extends React.Component<IRegisterTableProps, IRegisterTableState> {

    constructor(props: IRegisterTableProps) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            selectedId: ''
        };
    }

    public render() {
        return (
            <View style={{ flex: 1, height: '90%' }}>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    minimumDate={this.getMinimumDate}
                    mode='time'
                />
                <View style={styles.rowContainer}>
                    <TextColumn value='Name' textStyle={styles.columnHeader}/>
                    <TextColumn value='In' textStyle={styles.columnHeader}/>
                    <TextColumn value='Out' textStyle={styles.columnHeader}/>
                </View>
                <ScrollView>
                {this.props.registerEntries
                    .map((registerEntry: IRegisterEntry) => this.getSwipeRow(registerEntry))}
                </ScrollView>
            </View>
        );
    }

    private getSwipeRow(registerEntry: IRegisterEntry) {
        return (
            <Swipeout right={this.getSwipeButtonProps(registerEntry)}
                      key={registerEntry.id}
                      autoClose={true}
                      style={styles.swipeout}
                      backgroundColor={white}>
                <TouchableOpacity>
                    <Row
                        key={registerEntry.id}
                        items={[
                            {
                                type: RowType.TEXT,
                                value: registerEntry.fullName
                            },
                            {
                                type: RowType.TEXT,
                                value: timeFormatter(registerEntry.entry)
                            },
                            this.getExitItem(registerEntry)
                        ]}
                    />
                </TouchableOpacity>
            </Swipeout>
        );
    }

    private getSwipeButtonProps(swipeItem: IRegisterEntry) {
        const swipeButtons: ISwipeButton[] = this.getSwipeButtons || [];
        return swipeButtons.map((button: ISwipeButton) => ({
            ...button,
            onPress: button.onPress.bind(this, swipeItem.id)
        }));
    }

    private get getSwipeButtons() {
        return [
            {
                text: 'Delete',
                backgroundColor: red.red700,
                onPress: (id) => this.props.onDeleteEntry(id)
            },
        ]
    }

    private getExitItem(entry: IRegisterEntry) {
        if (entry.exit && entry.exit.valueOf() > 0) {
            return {
                type: RowType.TEXT,
                value: timeFormatter(entry.exit)
            };
        }
        const onPress = this.props.settings.autoSignOut ? this.handleOnQuickSignOut.bind(this, entry.id)
            : this.showDateTimePicker.bind(this, entry.id);
        return {
            type: RowType.BUTTON,
            value: 'Sign Out',
            onPress
        };
    }

    private handleOnQuickSignOut = (selectedId: string) => {
        this.setState({
            selectedId
        }, () => this.handleDatePicked(new Date()));
    };

    private get getMinimumDate(): Date | undefined {
        const { selectedId } = this.state;
        const registerEntry: IRegisterEntry | undefined = this.props.registerEntries.find(x => x.id === selectedId);
        if (registerEntry) {
            return moment(registerEntry.entry).toDate();
        }
        return undefined;
    }

    private showDateTimePicker = (selectedId: string) => this.setState({ isDateTimePickerVisible: true, selectedId });

    private hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false, selectedId: '' });

    private handleDatePicked = (selectedDate: Date) => {
        const { register } = this.props;
        const { selectedId } = this.state;
        const { date } = register;
        const currentDate = moment(date);
        const exitMoment = moment(selectedDate);
        exitMoment.set({
            date: currentDate.date(),
            month: currentDate.month(),
            year: currentDate.year(),
            hours: selectedDate.getHours(),
            minutes: selectedDate.getMinutes(),
            seconds: selectedDate.getSeconds()
        });
        this.props.onSignOutUser({
            id: selectedId,
            exit: exitMoment.valueOf()
        });
        this.hideDateTimePicker();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 10
    },
    dateTitle: {
        textAlign: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: grey.grey200,
        height: 40
    },
    columnHeader: {
        color: grey.grey400,
        fontWeight: 'bold'
    },
    swipeout: {
        borderBottomWidth: 1,
        borderBottomColor: grey.grey200,
    }
});