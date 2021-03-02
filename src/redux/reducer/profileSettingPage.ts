import { IProfileSettingsPageState } from '../../interface/state';
import {
  IProfileSettingPageErrorsAction,
  IProfileSettingPageSetFormAction,
  IProfileSettingPageSetFormDefaultAction,
  IProfileSettingPageSetLoadingAction,
  IProfileSettingsPageAction,
  EProfileSettingsPageAction,
} from '../../interface/action';
import User from '../../models/User';

const INITIAL_STATE: IProfileSettingsPageState = {
  isLoading: false,
  form: new User().getAttributes(),
  formDefault: new User().getAttributes(),
  errors: {},
};

const profileSettingPageReducer = (state = INITIAL_STATE, action: IProfileSettingsPageAction)
: IProfileSettingsPageState => {
  switch (action.type) {
    case EProfileSettingsPageAction.PROFILE_SETTING_SET_LOADING: {
      const { isLoading } = action.payload as IProfileSettingPageSetLoadingAction;
      return { ...state, isLoading };
    }
    case EProfileSettingsPageAction.PROFILE_SETTING_SET_FORM: {
      const { form } = action.payload as IProfileSettingPageSetFormAction;
      return { ...state, form };
    }
    case EProfileSettingsPageAction.PROFILE_SETTING_SET_FORM_DEFAULT: {
      const { formDefault } = action.payload as IProfileSettingPageSetFormDefaultAction;
      return { ...state, formDefault };
    }
    case EProfileSettingsPageAction.PROFILE_SETTING_SET_ERRORS: {
      const { errors } = action.payload as IProfileSettingPageErrorsAction;
      return { ...state, errors };
    }
    case EProfileSettingsPageAction.PROFILE_SETTING_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default profileSettingPageReducer;
