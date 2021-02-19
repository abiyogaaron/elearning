import { ICommonState } from '../../interface/state';
import {
  ECommonAction,
  ICommonAction,
  ICommonSetUserAuthAction,
  ICommonSetPageLoadingAction,
} from '../../interface/action';

const INITIAL_STATE: ICommonState = {
  user: {
    displayName: null,
    email: null,
    photoURL: null,
    emailVerified: false,
    uid: '',
    phoneNumber: null,
    isAnonymous: false,
    lastLoginAt: 0,
    createdAt: 0,
  },
  pageLoading: false,
};

const commonReducer = (state = INITIAL_STATE, action: ICommonAction)
: ICommonState => {
  switch (action.type) {
    case ECommonAction.COMMON_SET_USER_AUTH: {
      const { user } = action.payload as ICommonSetUserAuthAction;
      return { ...state, user };
    }
    case ECommonAction.COMMON_SET_PAGE_LOADING: {
      const { pageLoading } = action.payload as ICommonSetPageLoadingAction;
      return { ...state, pageLoading };
    }
    case ECommonAction.COMMON_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default commonReducer;
