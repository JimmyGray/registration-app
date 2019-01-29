import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { firebaseApp } from '../../App';
import { Screens } from '../../Screens';
import { spacing } from '../../theme/theme';

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
            this.props.navigation.navigate(user ? Screens.MAIN : Screens.LOGIN)
        })
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text style={{ marginBottom: spacing.small }}>Loading</Text>
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