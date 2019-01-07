import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { User } from '../../Entity/User';
import { Screens } from '../../Screens';
import { blue } from '../../theme/colors';
import { IDeleteEntryAction, IRegister, ISignOutUserAction } from '../RegisterListOperations';
import RegisterTable from '../RegisterTable/RegisterTable';
import { IRegisterEntry } from './RegisterOperations';

export interface IRegisterProps {
    register: IRegisterEntry[];
    registerList: IRegister[];
    registrationId: string;
    onSignOutUser: (entry: ISignOutUserAction) => void;
    onDeleteEntry: (entry: IDeleteEntryAction) => void;
    users: User[];
    navigation: any;
}

export interface IRegisterState {
    query: string;
    modalVisible: boolean;
}

export default class Register extends React.Component<IRegisterProps, IRegisterState> {

    public static navigationOptions = {
        title: 'Register'
    };

    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            modalVisible: false,
            query: ''
        };
    }

    public render() {
        const { registerList, registrationId } = this.props;
        const register: IRegister | undefined = registerList.find((reg: IRegister) => reg.id === registrationId);
        return (
            <View style={{ flex: 1 }}>
                {register &&
                <RegisterTable
                    register={register}
                    onSignOutUser={this.props.onSignOutUser}
                    onDeleteEntry={this.props.onDeleteEntry}
                />
                }
                <Icon
                    raised={true}
                    reverse={true}
                    name='add'
                    containerStyle={styles.icon}
                    color={blue.blue600}
                    onPress={this.onModalPress}/>
            </View>
        );
    }

    private onModalPress = () => {
        this.props.navigation.navigate((Screens.SEARCH_USER));
    };
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 10,
        bottom: 10
    }
});