import { createStore } from 'redux';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { User } from '../entity/User';
import { IRegisterEntry } from '../components/registration/Register/RegisterOperations';
import { IRegister } from '../components/registration/RegisterListOperations';
import { IUIState } from '../UIOperations';
import { rootReducer } from './combineReducers';

export interface IAppState {
    registerEntries: IRegisterEntry[];
    registerList: IRegister[];
    users: User[];
    ui: IUIState;
    editUser: string;
}

const UserTransform = createTransform(
    (inboundState: any) => {
        return inboundState.map(x => new User(x));
    },
    (outboundState: any) => {
        return outboundState.map(x => new User(x));
    },
    { whitelist:[ 'users' ] }
);

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'registerEntries', 'registerList', 'users' ],
    transforms: [UserTransform]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => {
    const store = createStore(persistedReducer);
    const persistor = persistStore(store);
    return { store, persistor }
};
