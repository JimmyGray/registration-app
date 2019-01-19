import { createStore, DeepPartial } from 'redux';
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

export const configureStore = () => {
    return createStore(rootReducer, INITIAL_STATE, devToolsEnhancer());
};
