import { Action, createAction, handleActions } from 'redux-actions';
import { uuid } from '../util/uuid';

export interface IRegister {
    id: string;
    date: Date;
    registrations: IRegisterEntry[];
}

export interface IRegisterEntry {
    id: string;
    fullName: string;
    entry: Date;
    exit?: Date;
}

export enum ACTION_TYPES {
    ADD_REGISTER = '@REGISTER_LIST/ADD_REGISTER',
    SIGN_IN_USER = '@REGISTER_LIST/SIGN_IN_USER',
    SIGN_OUT_USER = '@REGISTER_LIST/SIGN_OUT_USER',
    DELETE_ENTRY = '@REGISTER_LIST/DELETE_ENTRY'
}

export interface ISignInUserAction {
    id: string;
    registration: IRegisterEntry;
}

export interface ISignOutUserAction {
    id: string;
    registrationId: string;
}

export interface IDeleteEntryAction {
    id: string;
    registrationId: string;
}

export const addRegisterAction = () => createAction(ACTION_TYPES.ADD_REGISTER)();
export const signInUserAction = (entry: ISignInUserAction) => createAction(ACTION_TYPES.SIGN_IN_USER)(entry);
export const deleteEntryAction = (entry: IDeleteEntryAction) => createAction(ACTION_TYPES.DELETE_ENTRY)(entry);
export const signOutUserAction = (entry: ISignOutUserAction) => createAction(ACTION_TYPES.SIGN_OUT_USER)(entry);

export const REGISTER_LIST_STATE: IRegister[] = [];

export const registerListReducer = handleActions(
    {
        [ACTION_TYPES.ADD_REGISTER]: (state: any) => {
            const newRegisterEntry: IRegister = { id: uuid(), date: new Date(), registrations: [] };
            return [
                ...state,
                newRegisterEntry
            ];
        },
        [ACTION_TYPES.SIGN_IN_USER]: (state: IRegister[], action: Action<ISignInUserAction>) => {
            const registerEntry: IRegister | undefined = state.find((reg: IRegister) => reg.id === action.payload!.id);
            if (registerEntry) {
                const registrations: IRegisterEntry[] = registerEntry.registrations.concat(action.payload!.registration);
                const updatedRegister: IRegister = { ...registerEntry, registrations };
                return updateListItem(state, updatedRegister);
            }
            return state;
        },
        [ACTION_TYPES.DELETE_ENTRY]: (state: IRegister[], action: any) => {
            const registerEntry: IRegister | undefined = state.find((reg: IRegister) => reg.id === action.payload!.id);
            if (registerEntry) {
                const registrations: IRegisterEntry[] = registerEntry.registrations.filter((entry: IRegisterEntry) => entry.id !== action.payload!.registrationId);
                const updatedRegister: IRegister = { ...registerEntry, registrations };
                return updateListItem(state, updatedRegister);
            }
            return state;
        },
        [ACTION_TYPES.SIGN_OUT_USER]: (state: IRegister[], action: any) => {
            const registerEntry: IRegister | undefined = state.find((reg: IRegister) => reg.id === action.payload!.id);
            if (registerEntry) {
                const registrations: IRegisterEntry[] = registerEntry.registrations.map((entry: IRegisterEntry) => {
                    if (entry.id === action.payload.registrationId) {
                        return {
                            ...entry,
                            exit: new Date()
                        }
                    }
                    return entry;
                });
                const updatedRegister: IRegister = { ...registerEntry, registrations };
                return updateListItem(state, updatedRegister);
            }
            return state;
        },
    },
    REGISTER_LIST_STATE
);

const updateListItem: (list: IRegister[], update:IRegister) => IRegister[] = (list: IRegister[], update: IRegister) => {
    return list.map((register: IRegister) => {
        if (register.id === update.id) {
            return update;
        }
        return register;
    });
}