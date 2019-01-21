import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { firebaseApp } from "../App";
import { Screens } from "../Screens";

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
        }
    }

    private handleSignUp = () => {
        const { email, password } = this.state
        firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => this.props.navigation.navigate(Screens.MAIN_STACK))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Sign Up" onPress={this.handleSignUp} />
                <Button
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate(Screens.LOGIN)}
                />
            </View>
        )
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