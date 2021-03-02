import { IPasswordSettingsPageState } from '../../interface/state';
import {
  IPasswordSettingPageErrorsAction,
  IPasswordSettingPageSetLoadingAction,
  IPasswordSettingPageSetFormAction,
  EPasswordSettingsPageAction,
  IPasswordSettingsPageAction,
} from '../../interface/action';

const INITIAL_STATE: IPasswordSettingsPageState = {
  isLoading: false,
  form: {
    password_old: '',
    password_new: '',
    password_confirm: '',
  },
  formDefault: {
    password_old: '',
    password_new: '',
    password_confirm: '',
  },
  errors: {},
};

const passwordSettingPageReducer = (state = INITIAL_STATE, action: IPasswordSettingsPageAction)
: IPasswordSettingsPageState => {
  switch (action.type) {
    case EPasswordSettingsPageAction.PASSWORD_SETTING_SET_LOADING: {
      const { isLoading } = action.payload as IPasswordSettingPageSetLoadingAction;
      return { ...state, isLoading };
    }
    case EPasswordSettingsPageAction.PASSWORD_SETTING_SET_FORM: {
      const { form } = action.payload as IPasswordSettingPageSetFormAction;
      return { ...state, form };
    }
    case EPasswordSettingsPageAction.PASSWORD_SETTING_SET_ERRORS: {
      const { errors } = action.payload as IPasswordSettingPageErrorsAction;
      return { ...state, errors };
    }
    case EPasswordSettingsPageAction.PASSWORD_SETTING_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default passwordSettingPageReducer;
