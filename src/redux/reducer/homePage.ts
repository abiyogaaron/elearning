import { IHomeState } from '../../interface/state';
import {
  EHomePageAction,
  IHomePageAction,
  IHomePageSetLoadingAction,
  IHomePageSetProgressAction,
} from '../../interface/action';

const INITIAL_STATE: IHomeState = {
  isLoading: false,
  progressUpload: 0,
};

const homePageReducer = (state = INITIAL_STATE, action: IHomePageAction)
: IHomeState => {
  switch (action.type) {
    case EHomePageAction.HOME_SET_LOADING: {
      const { isLoading } = action.payload as IHomePageSetLoadingAction;
      return { ...state, isLoading };
    }
    case EHomePageAction.HOME_SET_PROGRESS: {
      const { progressUpload } = action.payload as IHomePageSetProgressAction;
      return { ...state, progressUpload };
    }
    case EHomePageAction.HOME_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default homePageReducer;
