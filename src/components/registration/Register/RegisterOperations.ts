import { createAction, handleActions } from 'redux-actions';
import { REGISTER_LIST_ACTION_TYPES } from '../RegisterListOperations';

export enum ACTION_TYPES {
    SIGN_IN_USER = '@GUEST_BOOK/SIGN_IN_USER',
    SIGN_OUT_USER = '@GUEST_BOOK/SIGN_OUT_USER',
    DELETE_ENTRY = '@GUEST_BOOK/DELETE_ENTRY'
}

export interface IRegisterEntry {
    parentId: string;
    id: string;
    fullName: string;
    entry: number;
    exit?: number;
}

export interface ISignOutUserAction {
    id: string;
    exit: number;
}

export const signInUserAction = (guestEntry: IRegisterEntry) => createAction(ACTION_TYPES.SIGN_IN_USER)(guestEntry);
export const signOutUserAction = (id: string) => createAction(ACTION_TYPES.SIGN_OUT_USER)(id);
export const deleteEntryAction = (id: string) => createAction(ACTION_TYPES.DELETE_ENTRY)(id);

export const REGISTER_DEFAULT_STATE: IRegisterEntry[] = [];

export const registerEntriesReducer = handleActions(
    {
        [ACTION_TYPES.SIGN_IN_USER]: (state: any, action: any) => state.concat(action.payload),
        [ACTION_TYPES.DELETE_ENTRY]: (state: any, action: any) => state.filter((entry: IRegisterEntry) => entry.id !== action.payload),
        [ACTION_TYPES.SIGN_OUT_USER]: (state: IRegisterEntry[], action: any) => {
            return state.map(guestBookEntry => {
                if (guestBookEntry.id === action.payload.id) {
                    return {
                        ...guestBookEntry,
                        exit: action.payload.exit
                    }
                }
                return guestBookEntry;
            });
        },
        [REGISTER_LIST_ACTION_TYPES.REMOVE_REGISTER]: (state: IRegisterEntry[], action: any) => state
            .filter((entry: IRegisterEntry) => entry.parentId !== action.payload)
    },
    REGISTER_DEFAULT_STATE
);