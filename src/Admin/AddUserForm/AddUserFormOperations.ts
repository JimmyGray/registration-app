import { createAction, handleActions } from 'redux-actions';

export enum ACTION_TYPES {
    EDIT_USER = '@EDIT_USER/EDIT_USER'
}
export const ADD_USER_FORM_DEFAULT_STATE: string = '';

export const editUserAction = (id: string) => createAction(ACTION_TYPES.EDIT_USER)(id);

export const editUserReducer = handleActions(
    {
        [ACTION_TYPES.EDIT_USER]: (_: any, action: any) => action.payload
    },
    ADD_USER_FORM_DEFAULT_STATE
);