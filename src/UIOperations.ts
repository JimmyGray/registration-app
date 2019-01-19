import moment from 'moment';
import { createAction, handleActions } from 'redux-actions';
import { IRegister } from './Registration/RegisterListOperations';

export interface IUIState {
    register: IRegister;
}

export enum ACTION_TYPES {
    SELECT_REGISTER = '@UI_OPERATIONS/SELECT_REGISTER'
}
export const selectRegisterAction = (register: IRegister) => createAction(ACTION_TYPES.SELECT_REGISTER)(register);

export const UI_DEFAULT_STATE: IUIState = {
    register: { id: '', date: moment() }
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