import { ThunkAction } from 'redux-thunk';
import { History } from 'history';
import { toast } from 'react-toastify';
import { IAppState } from '../../interface/state';
import {
  TAllAction,
  ELoginPageAction,
  ILoginPageAction,
} from '../../interface/action';
import Firebase from '../../service';

const ADMIN_EMAIL = 'abiyogaaron@gmail.com';

const setLoading = (isLoading: boolean): ILoginPageAction => ({
  type: ELoginPageAction.LOGIN_SET_LOADING,
  payload: { isLoading },
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

    const userData = await firebase.readUserByUID(res.uid);
    if (userData.empty) {
      const userdata = {
        uid: res.uid,
        name: res.displayName,
        email: res.email,
        isVerified: res.emailVerified,
        status: 'active',
        role: res.email === ADMIN_EMAIL ? 'admin' : 'student',
      };
      await firebase.addDocumentToCollections('users', userdata);
    }
    history.push('/dashboard');
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};
