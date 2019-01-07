import * as React from 'react';
import { View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { User } from '../../Entity/User';
import { Screens } from '../../Screens';
import { green } from '../../theme/colors';

export interface IAddUserFormProps {
    onAddUser: (user: User) => void;
    navigation: any;
}

export interface IAddUserFormState {
    user: User;
}

export default class AddUserForm extends React.Component<IAddUserFormProps, IAddUserFormState> {

    public static navigationOptions = {
        title: 'Add User',
    };

    constructor(props: IAddUserFormProps) {
        super(props);
        this.state = {
            user: new User()
        };
    }

    public render() {
        return (
            <View>
                <FormLabel>First Name</FormLabel>
                <FormInput onChangeText={(value) => this.handleOnChange(value, 'firstName')}/>
                <FormLabel>Surname</FormLabel>
                <FormInput onChangeText={(value) => this.handleOnChange(value, 'surname')}/>
                <Button
                    title='SUBMIT'
                    icon={{ name: 'check' }}
                    disabled={!this.canSubmit()}
                    backgroundColor={green.green600}
                    onPress={this.handleOnAddUser}
                />
            </View>
        );
    }

    private handleOnChange = (value: string, property: string) => {
        const user: User = this.state.user.cloneWithProps({
            [property]: value
        });
        this.setState({
            user
        });
    };

    private handleOnAddUser = () => {
        this.props.onAddUser(this.state.user);
        this.setState({ user: new User() },
            () => this.props.navigation.navigate(Screens.ADMIN)
        );
    };

    private canSubmit() {
        return this.state.user.isValid();
    }
}