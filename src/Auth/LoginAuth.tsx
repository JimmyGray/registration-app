import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { firebaseApp } from '../App';
import { Screens } from '../Screens';

export interface ILoginAuthProps {
    navigation: any;
}

export interface ILoginAuthState {
    email: string;
    password: string;
    errorMessage: string;
}

export default class Login extends React.Component<ILoginAuthProps, ILoginAuthState> {

    public constructor(props: ILoginAuthProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: undefined
        }
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Login" onPress={this.handleLogin} />
                <Button
                    title="Don't have an account? Sign Up"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
        )
    }

    private handleLogin = () => {
        const { email, password } = this.state
        firebaseApp
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate(Screens.MAIN_STACK))
            .catch(error => this.setState({ errorMessage: error.message }))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})