import { createAction, handleActions } from 'redux-actions';

export enum ACTION_TYPES {
    SIGN_IN_USER = '@GUEST_BOOK/SIGN_IN_USER',
    SIGN_OUT_USER = '@GUEST_BOOK/SIGN_OUT_USER',
    DELETE_ENTRY = '@GUEST_BOOK/DELETE_ENTRY'
}

export interface IRegisterEntry {
    id: string;
    fullName: string;
    entry: Date;
    exit?: Date;
}

export const signInUserAction = (guestEntry: IRegisterEntry) => createAction(ACTION_TYPES.SIGN_IN_USER)(guestEntry);
export const signOutUserAction = (id: string) => createAction(ACTION_TYPES.SIGN_OUT_USER)(id);
export const deleteEntryAction = (id: string) => createAction(ACTION_TYPES.DELETE_ENTRY)(id);

export const REGISTER_DEFAULT_STATE: IRegisterEntry[] = [];

export const registerReducer = handleActions(
    {
        [ACTION_TYPES.SIGN_IN_USER]: (state: any, action: any) => state.concat(action.payload),
        [ACTION_TYPES.DELETE_ENTRY]: (state: any, action: any) => state.filter((entry: IRegisterEntry) => entry.id !== action.payload),
        [ACTION_TYPES.SIGN_OUT_USER]: (state: IRegisterEntry[], action: any) => {
            return state.map(guestBookEntry => {
                if (guestBookEntry.id === action.payload) {
                    return {
                        ...guestBookEntry,
                        exit: new Date()
                    }
                }
                return guestBookEntry;
            });
        },
    },
    REGISTER_DEFAULT_STATE
);