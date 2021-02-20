import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { IAppState } from '../../interface/state';
import { ICommonUser, UserProfile } from '../../interface';
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

export const setUserProfile = (userProfile: UserProfile): ICommonAction => ({
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
