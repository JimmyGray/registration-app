import { firebaseReducer as firebase } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import localStorage from 'redux-persist/lib/storage';
import { editUserReducer } from '../Admin/AddUserForm/AddUserFormOperations';
import { userReducer } from '../Admin/AdminOperations';
import { registerEntriesReducer } from '../Registration/Register/RegisterOperations';
import { registerListReducer } from '../Registration/RegisterListOperations';
import { uiReducer } from '../UIOperations';

export const rootReducer = combineReducers<any>({
        firebase: persistReducer(
            { key: 'firebaseState', storage: localStorage, stateReconciler: hardSet },
            firebase
        ),
        users: userReducer,
        editUser: editUserReducer,
        registerEntries: registerEntriesReducer,
        registerList: registerListReducer,
        ui: uiReducer
    }
);