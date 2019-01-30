import { createStore } from 'redux';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { IRegisterEntry } from '../components/registration/Register/RegisterOperations';
import { IRegister } from '../components/registration/RegisterListOperations';
import { User } from '../entity/User';
import { UserSerializer } from '../entity/UserSerializer';
import { IUIState } from '../UIOperations';
import { rootReducer } from './combineReducers';

export interface ISettings {
    autoSignOut: boolean;
}

export interface IAppState {
    registerEntries: IRegisterEntry[];
    registerList: IRegister[];
    users: User[];
    settings: ISettings;
    ui: IUIState;
    editUser: string;
}

const UserTransform = createTransform(
    (inboundState: any) => {
        return inboundState.map(x => UserSerializer.toUser(x));
    },
    (outboundState: any) => {
        return outboundState.map(x => UserSerializer.toUser(x));
    },
    { whitelist:[ 'users' ] }
);

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'registerEntries', 'registerList', 'users', 'settings' ],
    transforms: [UserTransform]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => {
    const store = createStore(persistedReducer);
    const persistor = persistStore(store);
    return { store, persistor }
};
