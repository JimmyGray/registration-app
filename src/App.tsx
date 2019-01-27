import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigation } from './Main';
import { configureStore } from './store/createStore';

export const { store, persistor, firebaseApp } = configureStore();
YellowBox.ignoreWarnings(['Remote debugger']);

export class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppNavigation/>
                </PersistGate>
            </Provider>
        );
    }
}