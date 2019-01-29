import { isEmpty } from 'lodash';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, FormInput, FormLabel, FormValidationMessage, normalize, Text } from 'react-native-elements';
import { firebaseApp } from '../../App';
import { Screens } from '../../Screens';
import { blue, green, grey, keyboardAV, spacing } from '../../theme/theme';

export interface ILoginAuthProps {
    navigation: any;
}

export interface ILoginAuthState {
    email: string;
    password: string;
    errorMessage?: string;
}

export default class Login extends React.Component<ILoginAuthProps, ILoginAuthState> {

    public constructor(props: ILoginAuthProps) {
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
                    <Text h4={true}>Login</Text>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        style={styles.textInput}
                        autoCapitalize='none'
                        placeholder='Email'
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        secureTextEntry={true}
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    {this.state.errorMessage &&
                    <FormValidationMessage>{this.state.errorMessage}</FormValidationMessage>}
                </View>
                <View style={styles.loginButton}>
                    <Button
                        title='Login'
                        onPress={this.handleLogin}
                        disabled={this.isDisabled}
                        backgroundColor={green.green700}
                        buttonStyle={styles.button}
                    />
                </View>
                <View>
                    <Button
                        title="Don't have an account? Sign Up"
                        onPress={() => this.props.navigation.navigate(Screens.SIGN_UP)}
                        backgroundColor={blue.blue700}
                        buttonStyle={styles.button}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }

    private get isDisabled() {
        return isEmpty(this.state.email) || isEmpty(this.state.password);
    }

    private handleLogin = () => {
        const { email, password } = this.state;
        firebaseApp
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate(Screens.MAIN))
            .catch(error => this.setState({ errorMessage: error.message }));
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: spacing.xSmall
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: normalize(40),
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: spacing.xSmall
    },
    loginButton: {
        marginBottom: spacing.xSmall
    },
    button: {
        height: normalize(50)
    }
});