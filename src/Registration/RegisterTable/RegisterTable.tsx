import * as React from 'react';
import { KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Header } from 'react-navigation';
import { grey, red } from '../../theme/colors';
import { dateFormatter } from '../../util/formatter';
import { IRegisterEntry } from '../Register/RegisterOperations';
import { IDeleteEntryAction, IRegister, ISignOutUserAction } from '../RegisterListOperations';
import { Row, RowType } from './Row';

export interface IRegisterTableProps {
    register: IRegister;
    onSignOutUser: (entry: ISignOutUserAction) => void;
    onDeleteEntry: (entry: IDeleteEntryAction) => void;
}

export interface IRegisterTableState {
    overlay: boolean;
    selectedId: string;
}

export default class RegisterTable extends React.Component<IRegisterTableProps, IRegisterTableState> {

    constructor(props: IRegisterTableProps) {
        super(props);
        this.state = {
            overlay: false,
            selectedId: ''
        }
    }

    public render() {
        return (
            <View style={{ flex: 1, height: '90%' }}>
                <Text>{this.props.register.id}</Text>
                <Modal visible={this.state.overlay} onRequestClose={() => console.log('Modal Closed')}>
                    <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={Header.HEIGHT + 30}>
                        <View>
                            <Button
                                title='Delete'
                                icon={{ name: 'trash' }}
                                backgroundColor={red.red500}
                                onPress={this.handleOnDelete}
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
                </Modal>
                <Row
                    key='guestbook-header'
                    items={[
                        {
                            type: RowType.TEXT,
                            value: 'Name'
                        },
                        {
                            type: RowType.TEXT,
                            value: 'In'
                        },
                        {
                            type: RowType.TEXT,
                            value: 'Out'
                        }
                    ]}
                />
                <ScrollView style={{ flex: 1 }}>
                {this.props.register.registrations
                    .map((registerEntry: IRegisterEntry, idx) =>
                        <Row
                            key={registerEntry.id + idx}
                            onLongPress={this.onLongPress.bind(this, registerEntry.id)}
                            items={[
                                {
                                    type: RowType.TEXT,
                                    value: registerEntry.fullName
                                },
                                {
                                    type: RowType.TEXT,
                                    value: dateFormatter(registerEntry.entry)
                                },
                                this.getExitItem(registerEntry)
                            ]}
                        />)}
                </ScrollView>
            </View>
        );
    }

    private getExitItem(guestBookEntry: IRegisterEntry) {
        if (guestBookEntry.exit && guestBookEntry.exit.valueOf() > 0) {
            return {
                type: RowType.TEXT,
                value: dateFormatter(guestBookEntry.entry)
            };
        }
        return {
            type: RowType.BUTTON,
            value: 'Sign Out',
            onPress: this.handleOnSignOutUser.bind(this, guestBookEntry.id)
        };
    }

    private handleOnSignOutUser = (registrationId: string) => {
        this.props.onSignOutUser({ id: this.props.register.id, registrationId });
    }

    private onLongPress = (selectedId: string) => {
        this.setState({
            overlay: !this.state.overlay,
            selectedId
        });
    }

    private handleOnDelete = () => {
        this.props.onDeleteEntry({ id: this.props.register.id, registrationId: this.state.selectedId });
        this.setState({
            overlay: false,
            selectedId: ''
        });
    }

    private handleOnClose = () => {
        this.setState({
            overlay: false,
            selectedId: ''
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    }
});