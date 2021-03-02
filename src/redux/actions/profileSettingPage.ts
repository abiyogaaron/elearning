import { ThunkAction } from 'redux-thunk';
import { batch } from 'react-redux';
import { toast } from 'react-toastify';
import { IAppState } from '../../interface/state';
import {
  TAllAction,
  EProfileSettingsPageAction,
  IProfileSettingsPageAction,
} from '../../interface/action';
import { IUserModels } from '../../interface/model';
import Firebase from '../../service';

const setLoading = (isLoading: boolean): IProfileSettingsPageAction => ({
  type: EProfileSettingsPageAction.PROFILE_SETTING_SET_LOADING,
  payload: { isLoading },
});

export const setErrors = (errors: { [key: string]: string }): IProfileSettingsPageAction => ({
  type: EProfileSettingsPageAction.PROFILE_SETTING_SET_ERRORS,
  payload: { errors },
});

export const resetStateData = () => ({
  type: EProfileSettingsPageAction.PROFILE_SETTING_RESET_STATE,
});

export const setFormData = (form: IUserModels): IProfileSettingsPageAction => ({
  type: EProfileSettingsPageAction.PROFILE_SETTING_SET_FORM,
  payload: { form },
});

export const setFormDefaultData = (formDefault: IUserModels): IProfileSettingsPageAction => ({
  type: EProfileSettingsPageAction.PROFILE_SETTING_SET_FORM_DEFAULT,
  payload: { formDefault },
});

export const saveProfileSettings = (
  form: IUserModels,
  id: string,
): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const firebase = new Firebase();
    await firebase.updateProfileSetting(form, id);
    toast.success('Profile data updated successfully ...');
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getUserProfile = (
  email: string,
): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const firebase = new Firebase();
    const userProfile = await firebase.getUserDataByEmail(email);

    batch(() => {
      dispatch(setFormData(userProfile));
      dispatch(setFormDefaultData(userProfile));
    });
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};
