import { combineReducers } from 'redux';
import { adminReducer } from '../Admin/AdminOperations';
import { registerReducer } from '../Registration/Register/RegisterOperations';
import { registerListReducer } from '../Registration/RegisterListOperations';
import { uiReducer } from '../UIOperations';

export const rootReducer = combineReducers(
    {
        users: adminReducer,
        register: registerReducer,
        registerList: registerListReducer,
        ui: uiReducer
    }
);