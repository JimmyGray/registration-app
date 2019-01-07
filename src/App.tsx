import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { AppNavigation } from './Main';
import { configureStore } from './store/createStore';

const store = configureStore();
YellowBox.ignoreWarnings(['Remote debugger']);

export class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <AppNavigation />
            </Provider>
        );
    }
}