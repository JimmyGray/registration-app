import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { User } from '../../Entity/User';
import { Screens } from '../../Screens';
import { blue, green } from '../../theme/theme';
import { dateFormatter } from '../../util/formatter';
import { IRegister } from '../RegisterListOperations';
import RegisterTable from '../RegisterTable/RegisterTable';
import { IRegisterEntry, ISignOutUserAction } from './RegisterOperations';

export interface IRegisterProps {
    register: IRegister;
    registerEntries: IRegisterEntry[];
    onSignOutUser: (payload: ISignOutUserAction) => void;
    onDeleteEntry: (id: string) => void;
    users: User[];
    navigation: any;
}

export interface IRegisterState {
    query: string;
    modalVisible: boolean;
}

export default class Register extends React.Component<IRegisterProps, IRegisterState> {


    public static navigationOptions = ({ navigation  }) => {
        const { state } = navigation;
        if (state.params !== undefined){
            return {
                title: state.params.title
            }
        }
        return {};
    };

    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            modalVisible: false,
            query: ''
        };
    }

    public componentWillMount(){
        const { setParams } = this.props.navigation;
        const { register } = this.props;
        if (register) {
            setParams({ title: dateFormatter(register.date) });
        }
    }

    public render() {
        const { register, registerEntries } = this.props;
        const filteredEntries: IRegisterEntry[] = registerEntries.filter((entry: IRegisterEntry) => entry.parentId === register.id);
        return (
            <View style={{ flex: 1 }}>
                {filteredEntries &&
                <RegisterTable
                    register={register}
                    registerEntries={filteredEntries}
                    onSignOutUser={this.props.onSignOutUser}
                    onDeleteEntry={this.props.onDeleteEntry}
                />
                }
                <Icon
                    raised={true}
                    reverse={true}
                    name='add'
                    containerStyle={styles.icon}
                    color={green.green700}
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