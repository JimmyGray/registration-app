import { createAction, handleActions } from 'redux-actions';
import { ISettings } from '../../store/createStore';

export enum ACTION_TYPES {
    TOGGLE_SETTING = '@SETTINGS/TOGGLE_SETTING'
}
export const SETTINGS_DEFAULT_STATE: ISettings = {
  autoSignOut: false
};

export enum Setting {
    AUTO_SIGN_OUT = 'autoSignOut'
}

export const toggleSettingAction = (setting: Setting) => createAction(ACTION_TYPES.TOGGLE_SETTING)(setting);

export const settingsReducer = handleActions(
    {
        [ACTION_TYPES.TOGGLE_SETTING]: (state: any, action: any) => ({
            ...state,
            [action.payload]: !state[action.payload]
        }),
    },
    SETTINGS_DEFAULT_STATE
);