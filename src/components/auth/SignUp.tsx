import { isEmpty } from 'lodash';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, FormInput, FormLabel, FormValidationMessage, normalize, Text } from 'react-native-elements';
import { firebaseApp } from '../../App';
import { Screens } from '../../Screens';
import { blue, green, grey, keyboardAV, spacing } from '../../theme/theme';

export interface ISignUpProps {
    navigation: any;
}

export interface ISignUpState {
    email: string;
    password: string;
    errorMessage?: string;
}

export default class SignUp extends React.Component<ISignUpProps, ISignUpState> {

    public constructor(props: ISignUpProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: undefined
        };
    }

    public render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'
                                  keyboardVerticalOffset={keyboardAV}>
                <View style={styles.formContainer}>
                    <Text h4={true}>Sign Up</Text>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        placeholder="Email"
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        secureTextEntry
                        placeholder="Password"
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    {this.state.errorMessage &&
                    <FormValidationMessage>
                        {this.state.errorMessage}
                    </FormValidationMessage>}
                </View>
                <View style={styles.signUpButton}>
                    <Button
                        title="Sign Up"
                        onPress={this.handleSignUp}
                        disabled={this.isDisabled}
                        backgroundColor={green.green700}
                        buttonStyle={styles.button}
                    />
                </View>
                <View>
                    <Button
                        title="Already have an account? Login"
                        onPress={() => this.props.navigation.navigate(Screens.LOGIN)}
                        style={styles.button}
                        backgroundColor={blue.blue700}
                        buttonStyle={styles.button}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }

    private handleSignUp = () => {
        const { email, password } = this.state;
        firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => this.props.navigation.navigate(Screens.MAIN))
          .catch(error => this.setState({ errorMessage: error.message }));
    };

    private get isDisabled() {
        return isEmpty(this.state.email) || isEmpty(this.state.password);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: spacing.xSmall
    },
    textInput: {
        height: normalize(40),
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: spacing.xSmall
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpButton: {
        marginBottom: spacing.xSmall
    },
    button: {
        height: normalize(50)
    }
});