import { ThunkAction } from 'redux-thunk';
import { History } from 'history';
import { toast } from 'react-toastify';
import { IAppState } from '../../interface/state';
import User from '../../models/User';
import {
  TAllAction,
  ELoginPageAction,
  ILoginPageAction,
} from '../../interface/action';
import Firebase from '../../service';
import { IUserModels, ILoginModels } from '../../interface/model';

const ADMIN_EMAIL = 'abiyogaaron@gmail.com';

const setLoading = (isLoading: boolean): ILoginPageAction => ({
  type: ELoginPageAction.LOGIN_SET_LOADING,
  payload: { isLoading },
});

export const setFormData = (form: ILoginModels): ILoginPageAction => ({
  type: ELoginPageAction.LOGIN_SET_FORM,
  payload: { form },
});

export const setErrors = (errors: { [key: string]: string }): ILoginPageAction => ({
  type: ELoginPageAction.LOGIN_SET_ERRORS,
  payload: { errors },
});

export const resetStateData = () => ({
  type: ELoginPageAction.LOGIN_RESET_STATE,
});

export const loginAuthentication = (
  email: string,
  password: string,
  history: History,
): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const firebase = new Firebase();
    const res = await firebase.authentication(email, password);

    const userData = await firebase.readUserByEmail(email);
    if (userData.empty) {
      const userObjData = {
        user_email: res.email || '',
        user_isVerified: res.emailVerified,
        user_full_name: res.displayName || '',
        user_role: res.email === ADMIN_EMAIL ? 'admin' : 'student',
        user_status_active: true,
        user_phone_number: '',
        user_photo_url: '',
      };
      const user = new User(userObjData);
      await firebase.addDocumentToCollections<IUserModels>('users', user.getAttributes());
    }
    history.push('/dashboard');
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const sendResetEmail = (
  email: string,
): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const firebase = new Firebase();
    await firebase.sendResetPassword(email);
    toast.success(`email has been sent, please check your ${email} inbox`);
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};
