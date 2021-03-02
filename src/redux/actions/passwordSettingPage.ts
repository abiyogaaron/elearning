import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { IAppState } from '../../interface/state';
import {
  TAllAction,
  EPasswordSettingsPageAction,
  IPasswordSettingsPageAction,
} from '../../interface/action';
import { IPasswordSettingsModels } from '../../interface/model';
import Firebase from '../../service';

const setLoading = (isLoading: boolean): IPasswordSettingsPageAction => ({
  type: EPasswordSettingsPageAction.PASSWORD_SETTING_SET_LOADING,
  payload: { isLoading },
});

export const setErrors = (errors: { [key: string]: string }): IPasswordSettingsPageAction => ({
  type: EPasswordSettingsPageAction.PASSWORD_SETTING_SET_ERRORS,
  payload: { errors },
});

export const resetStateData = () => ({
  type: EPasswordSettingsPageAction.PASSWORD_SETTING_RESET_STATE,
});

export const setFormData = (form: IPasswordSettingsModels): IPasswordSettingsPageAction => ({
  type: EPasswordSettingsPageAction.PASSWORD_SETTING_SET_FORM,
  payload: { form },
});

export const resetPassword = (
  form: IPasswordSettingsModels,
): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const firebase = new Firebase();
    const email = getState().common.userProfile.user_email;

    await firebase.updatePassword(email, form.password_old, form.password_new);
    toast.success('New Password updated successfully ...');
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};
