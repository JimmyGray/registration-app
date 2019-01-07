import { createAction, handleActions } from 'redux-actions';

export interface IUIState {
    register: string;
}

export enum ACTION_TYPES {
    SELECT_REGISTER = '@UI_OPERATIONS/SELECT_REGISTER'
}
export const selectRegisterAction = (id: string) => createAction(ACTION_TYPES.SELECT_REGISTER)(id);

export const UI_DEFAULT_STATE: IUIState = {
    register: ''
};

export const uiReducer = handleActions(
    {
        [ACTION_TYPES.SELECT_REGISTER]: (state: any, action: any) => ({
            ...state,
            register: action.payload
        })
    },
    UI_DEFAULT_STATE
);