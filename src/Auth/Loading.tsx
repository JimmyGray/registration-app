import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { firebaseApp } from "../App";
import { Screens } from "../Screens";

export interface ILoadingProps {
    navigation: any;
}

export default class Loading extends React.Component<ILoadingProps> {

    public static navigationOptions = {
        title: null
    };

    public componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            console.log('user!', user);
            this.props.navigation.navigate(user ? Screens.MAIN : Screens.SIGN_UP)
        })
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})