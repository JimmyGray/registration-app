import * as firebase from 'firebase';
import { createStore, DeepPartial } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import devToolsEnhancer from 'remote-redux-devtools';
import { ADD_USER_FORM_DEFAULT_STATE } from '../Admin/AddUserForm/AddUserFormOperations';
import { ADMIN_DEFAULT_STATE } from '../Admin/AdminOperations';
import { User } from '../Entity/User';
import { IRegisterEntry, REGISTER_DEFAULT_STATE } from '../Registration/Register/RegisterOperations';
import { IRegister, REGISTER_LIST_STATE } from '../Registration/RegisterListOperations';
import { IUIState, UI_DEFAULT_STATE } from '../UIOperations';
import { rootReducer } from './combineReducers';

export interface IAppState {
    registerEntries: IRegisterEntry[];
    registerList: IRegister[];
    users: User[];
    ui: IUIState;
    editUser: string;
}
const INITIAL_STATE: DeepPartial<IAppState> = {
    registerEntries: REGISTER_DEFAULT_STATE,
    users: ADMIN_DEFAULT_STATE,
    registerList: REGISTER_LIST_STATE,
    ui: UI_DEFAULT_STATE,
    editUser: ADD_USER_FORM_DEFAULT_STATE
};

const persistConfig = {
    key: 'root',
    storage: localStorage
}

const config = {
    apiKey: "AIzaSyDN3_BN06BhfcWVzOmcBivb8y2Q8pCdn2Y",
    authDomain: "registration-9aa3e.firebaseapp.com",
    databaseURL: "https://registration-9aa3e.firebaseio.com",
    projectId: "registration-9aa3e",
    storageBucket: "registration-9aa3e.appspot.com",
    messagingSenderId: "480190452820",
    persistence: true
};

export function configureStore() {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(persistedReducer, INITIAL_STATE, devToolsEnhancer());
    const persistor = persistStore(store);
    const firebaseApp = firebase.initializeApp(config);
    return { store, persistor, firebaseApp };
};
