import { createAction, handleActions } from 'redux-actions';
import { User } from '../Entity/User';

export enum ACTION_TYPES {
    ADD_USER = '@ADMIN/ADD_USER',
    REMOVE_USER = '@ADMIN/REMOVE_USER'
}
export const ADMIN_DEFAULT_STATE: User[] = [
    new User('123', 'James', 'Gray'),
    new User('456', 'Abbey', 'Sanders'),
    new User('789', 'Anita', 'Gray'),
];

export const removeUserAction = (id: string) => createAction(ACTION_TYPES.REMOVE_USER)(id);
export const addUserAction = (user: User) => createAction(ACTION_TYPES.ADD_USER)(user);

export const adminReducer = handleActions(
    {
        [ACTION_TYPES.ADD_USER]: (state: User[], action: any) => state.concat(action.payload),
        [ACTION_TYPES.REMOVE_USER]: (state: User[], action: any) => state.filter(user => user.id !== action.payload),
    },
    ADMIN_DEFAULT_STATE
);