import { ICommonUser } from '../../interface';
import {
  ECommonAction,
  ICommonAction,
} from '../../interface/action';

export const setUserAuth = (user: ICommonUser): ICommonAction => ({
  type: ECommonAction.COMMON_SET_USER_AUTH,
  payload: { user },
});

export const setPageLoading = (pageLoading: boolean): ICommonAction => ({
  type: ECommonAction.COMMON_SET_PAGE_LOADING,
  payload: { pageLoading },
});

export const resetCommonState = () => ({
  type: ECommonAction.COMMON_RESET_STATE,
});
