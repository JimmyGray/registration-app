import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { User } from '../../../../entity/User';
import { Screens } from '../../../../Screens';
import { green, keyboardAVWithHeader } from '../../../../theme/theme';

export interface IAddUserFormProps {
    navigation: any;
}

export interface IAddUserFormState {
    user: User;
}

export default class BasicDetailsForm extends React.Component<IAddUserFormProps, IAddUserFormState> {

    public static navigationOptions = {
        title: 'Basic Details'
    };

    constructor(props: IAddUserFormProps) {
        super(props);
        this.state = {
            user: props.navigation.getParam('user') || new User({})
        }
    }

    public render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'
                                  keyboardVerticalOffset={keyboardAVWithHeader}>
                <View>
                    <FormLabel>First Name</FormLabel>
                    <FormInput value={this.state.user.firstName} onChangeText={(value) => this.handleOnChange(value, 'firstName')}/>
                    <FormLabel>Surname</FormLabel>
                    <FormInput value={this.state.user.surname} onChangeText={(value) => this.handleOnChange(value, 'surname')}/>
                </View>
                <View>
                    <Button
                        title='Next'
                        disabled={!this.canSubmit()}
                        backgroundColor={green.green700}
                        onPress={this.handleOnNext}
                    />
                </View>
            </KeyboardAvoidingView>
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

    private handleOnNext = () => {
        const { user } = this.state;
        this.props.navigation.navigate(Screens.ADD_USER_EMERGENCY_CONTACT, { user });
    };

    private canSubmit() {
        return this.state.user.isValid();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    }
});