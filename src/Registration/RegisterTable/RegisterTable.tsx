import moment from 'moment';
import * as React from 'react';
import { KeyboardAvoidingView, Modal, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { grey, keyboardAvoidingView, red } from '../../theme/theme';
import { timeFormatter } from '../../util/formatter';
import { IRegisterEntry, ISignOutUserAction } from '../Register/RegisterOperations';
import { IRegister } from '../RegisterListOperations';
import { Row, RowType, TextColumn } from './Row';

export interface IRegisterTableProps {
    register: IRegister;
    registerEntries: IRegisterEntry[];
    onSignOutUser: (payload: ISignOutUserAction) => void;
    onDeleteEntry: (id: string) => void;
}

export interface IRegisterTableState {
    overlay: boolean;
    selectedId: string;
    isDateTimePickerVisible: boolean;
}

export default class RegisterTable extends React.Component<IRegisterTableProps, IRegisterTableState> {

    constructor(props: IRegisterTableProps) {
        super(props);
        this.state = {
            overlay: false,
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
                <Modal visible={this.state.overlay} onRequestClose={() => console.log('Modal Closed')}>
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior='padding'
                        keyboardVerticalOffset={keyboardAvoidingView}>
                        <View>
                            <Button
                                title='Delete'
                                icon={{ name: 'trash', type: 'evilicon' }}
                                backgroundColor={red.reda200}
                                onPress={this.handleOnDelete}
                            />
                        </View>
                        <View>
                            <Button
                                title='Close'
                                backgroundColor={grey.grey600}
                                onPress={this.handleOnClose}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
                <View style={styles.rowContainer}>
                    <TextColumn value='Name' textStyle={styles.columnHeader}/>
                    <TextColumn value='In' textStyle={styles.columnHeader}/>
                    <TextColumn value='Out' textStyle={styles.columnHeader}/>
                </View>
                <ScrollView>
                {this.props.registerEntries
                    .map((registerEntry: IRegisterEntry) =>
                        <Row
                            key={registerEntry.id}
                            onLongPress={this.onLongPress.bind(this, registerEntry.id)}
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
                        />)}
                </ScrollView>
            </View>
        );
    }

    private getExitItem(entry: IRegisterEntry) {
        if (entry.exit && entry.exit.valueOf() > 0) {
            return {
                type: RowType.TEXT,
                value: timeFormatter(entry.exit)
            };
        }
        return {
            type: RowType.BUTTON,
            value: 'Sign Out',
            onPress: this.handleOnQuickSignOut.bind(this, entry.id)
        };
    }

    private handleOnQuickSignOut = (selectedId: string) => {
        this.setState({
            selectedId
        }, () => this.handleDatePicked(new Date()));
    }

    private onLongPress = (selectedId: string) => {
        this.setState({
            overlay: !this.state.overlay,
            selectedId
        });
    };

    private handleOnDelete = () => {
        this.props.onDeleteEntry(this.state.selectedId!);
        this.setState({
            overlay: false,
            selectedId: ''
        });
    };

    private handleOnClose = () => {
        this.setState({
            overlay: false,
            selectedId: ''
        });
    };

    private get getMinimumDate(): Date | undefined {
        const { selectedId } = this.state;
        const registerEntry: IRegisterEntry | undefined = this.props.registerEntries.find(x => x.id === selectedId);
        if (registerEntry) {
            return registerEntry.entry.toDate();
        }
        return undefined;
    }

    // private showDateTimePicker = (selectedId: string) => this.setState({ isDateTimePickerVisible: true, selectedId });

    private hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false, selectedId: '' });

    private handleDatePicked = (selectedDate: Date) => {
        const { register } = this.props;
        const { selectedId } = this.state;
        const { date } = register;
        const exit = moment(selectedDate);
        exit.set({
            date: date.date(),
            month: date.month(),
            year: date.year(),
            hours: selectedDate.getHours(),
            minutes: selectedDate.getMinutes(),
            seconds: selectedDate.getSeconds()
        });
        this.props.onSignOutUser({
            id: selectedId,
            exit
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
    }
});