import { createAction, handleActions } from 'redux-actions';
import { User } from '../Entity/User';

export enum ACTION_TYPES {
    ADD_USER = '@ADMIN/ADD_USER',
    REMOVE_USER = '@ADMIN/REMOVE_USER',
}
export const ADMIN_DEFAULT_STATE: IAdminState = [
    new User('123', 'James', 'Gray'),
    new User('123', 'Jamesashdjashdj', 'askjdjashdsj'),
];

export interface User {
    id: string;
    firstName: string;
    surname: string;
    allergies: any[]
}

export type IAdminState = User[];

export const removeUserAction = (id: string) => createAction(ACTION_TYPES.REMOVE_USER)(id);
export const addUserAction = (user: User) => createAction(ACTION_TYPES.ADD_USER)(user);

export const userReducer = handleActions(
    {
        [ACTION_TYPES.REMOVE_USER]: (state: any, action: any) => state.filter(user => user.id !== action.payload),
        [ACTION_TYPES.ADD_USER]: (state: any, action: any) => {
            if (state.find(user => user.id === action.payload.id)) {
                return state.map(user => action.payload.id === user.id ? action.payload : user);
            }
            return state.concat(action.payload);
        },
    },
    ADMIN_DEFAULT_STATE
);