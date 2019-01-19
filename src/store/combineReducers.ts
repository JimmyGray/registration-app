import { combineReducers } from 'redux';
import { editUserReducer } from '../Admin/AddUserForm/AddUserFormOperations';
import { userReducer } from '../Admin/AdminOperations';
import { registerEntriesReducer } from '../Registration/Register/RegisterOperations';
import { registerListReducer } from '../Registration/RegisterListOperations';
import { uiReducer } from '../UIOperations';

export const rootReducer = combineReducers<any>({
        users: userReducer,
        editUser: editUserReducer,
        registerEntries: registerEntriesReducer,
        registerList: registerListReducer,
        ui: uiReducer
    }
);