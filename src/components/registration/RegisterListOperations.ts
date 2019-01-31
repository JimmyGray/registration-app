import { createAction, handleActions } from 'redux-actions';
import { uuid } from '../../util/uuid';

export interface IRegister {
    id: string;
    date: number;
}

export enum REGISTER_LIST_ACTION_TYPES {
    ADD_REGISTER = '@REGISTER_LIST/ADD_REGISTER',
    REMOVE_REGISTER = '@REGISTER_LIST/REMOVE_REGISTER'
}

export const addRegisterAction = createAction(REGISTER_LIST_ACTION_TYPES.ADD_REGISTER);
export const removeRegisterAction = createAction(REGISTER_LIST_ACTION_TYPES.REMOVE_REGISTER);

export const REGISTER_LIST_STATE: IRegister[] = [];

export const registerListReducer = handleActions(
    {
        [REGISTER_LIST_ACTION_TYPES.ADD_REGISTER]: (state: any, action: any) => state.concat({ id: uuid(), date: action.payload }),
        [REGISTER_LIST_ACTION_TYPES.REMOVE_REGISTER]: (state: any, action: any) => state.filter((register: IRegister) => register.id !== action.payload)
    },
    REGISTER_LIST_STATE
);