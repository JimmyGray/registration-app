import { combineReducers } from 'redux';
import { editUserReducer } from '../components/admin/AddUserForm/AddUserFormOperations';
import { userReducer } from '../components/admin/AdminOperations';
import { registerEntriesReducer } from '../components/registration/Register/RegisterOperations';
import { registerListReducer } from '../components/registration/RegisterListOperations';
import { uiReducer } from '../UIOperations';

export const rootReducer = combineReducers<any>({
        users: userReducer,
        editUser: editUserReducer,
        registerEntries: registerEntriesReducer,
        registerList: registerListReducer,
        ui: uiReducer
    }
);