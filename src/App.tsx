import * as firebase from 'firebase';
import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { AppNavigation } from './Main';
import { configureStore } from './store/createStore';

const store = configureStore();
YellowBox.ignoreWarnings(['Remote debugger']);


// Initialize Firebase
const config = {
    apiKey: "AIzaSyDN3_BN06BhfcWVzOmcBivb8y2Q8pCdn2Y",
    authDomain: "registration-9aa3e.firebaseapp.com",
    databaseURL: "https://registration-9aa3e.firebaseio.com",
    projectId: "registration-9aa3e",
    storageBucket: "registration-9aa3e.appspot.com",
    messagingSenderId: "480190452820"
};

export const firebaseApp = firebase.initializeApp(config);

export class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <AppNavigation />
            </Provider>
        );
    }
}