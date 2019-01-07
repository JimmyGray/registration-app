import { createStore } from 'redux';
import { ADMIN_DEFAULT_STATE } from '../Admin/AdminOperations';
import { User } from '../Entity/User';
import { IRegisterEntry, REGISTER_DEFAULT_STATE } from '../Registration/Register/RegisterOperations';
import { IRegister } from '../Registration/RegisterList';
import { REGISTER_LIST_STATE } from '../Registration/RegisterListOperations';
import { IUIState, UI_DEFAULT_STATE } from '../UIOperations';
import { rootReducer } from './combineReducers';

export interface IUser {
    id: string;
    firstName: string;
    surname: string;
}

export interface IAppState {
    register: IRegisterEntry[];
    users: User[];
    registerList: IRegister[];
    ui: IUIState;
}
const INITIAL_STATE: IAppState = {
    register: REGISTER_DEFAULT_STATE,
    users: ADMIN_DEFAULT_STATE,
    registerList: REGISTER_LIST_STATE,
    ui: UI_DEFAULT_STATE
};

export const configureStore = () => {
    const store = createStore(rootReducer, INITIAL_STATE as any);
    return store;
};
