import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { IAppState } from '../../interface/state';
import { ICommonUser } from '../../interface';
import { IUserModels } from '../../interface/model';
import {
  TAllAction,
  ECommonAction,
  ICommonAction,
} from '../../interface/action';
import Firebase from '../../service';

export const setUserAuth = (user: ICommonUser): ICommonAction => ({
  type: ECommonAction.COMMON_SET_USER_AUTH,
  payload: { user },
});

export const setPageLoading = (pageLoading: boolean): ICommonAction => ({
  type: ECommonAction.COMMON_SET_PAGE_LOADING,
  payload: { pageLoading },
});

export const setSidebarVisible = (sidebarVisible: boolean): ICommonAction => ({
  type: ECommonAction.COMMON_SET_SIDEBAR,
  payload: { sidebarVisible },
});

export const setUserProfile = (userProfile: IUserModels): ICommonAction => ({
  type: ECommonAction.COMMON_SET_USER_PROFILE,
  payload: { userProfile },
});

export const resetCommonState = () => ({
  type: ECommonAction.COMMON_RESET_STATE,
});

export const getUserProfile = (
  email: string,
): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    const firebase = new Firebase();
    const userProfile = await firebase.getUserDataByEmail(email);
    dispatch(setUserProfile(userProfile));
  } catch (err) {
    toast.error(err.message);
  }
};

export const updateUserProfile = (
  user: IUserModels,
): ThunkAction<void, IAppState, {}, TAllAction> => async () => {
  try {
    const firebase = new Firebase();
    await firebase.updateDocumentsFromCollections('users', user, user.id || '');
  } catch (err) {
    toast.error(err.message);
  }
};

export const sendVerificationEmail = ()
: ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    dispatch(setPageLoading(true));
    const firebase = new Firebase();
    await firebase.sendVerificationEmail();
    toast.success('The email verification has been sent, please check your inbox');
  } catch (err) {
    toast.error('Please try again to send verification email ...');
  } finally {
    dispatch(setPageLoading(false));
  }
};
