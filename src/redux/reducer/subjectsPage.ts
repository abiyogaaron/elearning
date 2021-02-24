import { ISubjectsPageState } from '../../interface/state';
import {
  ISubjectsPageSetListAction,
  ISubjectsPageSetLoadingAction,
  ISubjectsPageAction,
  ESubjectsPageAction,
} from '../../interface/action';

const INITIAL_STATE: ISubjectsPageState = {
  isLoading: false,
  list: [],
};

const subjectsPageReducer = (state = INITIAL_STATE, action: ISubjectsPageAction)
: ISubjectsPageState => {
  switch (action.type) {
    case ESubjectsPageAction.SUBJECT_SET_LOADING: {
      const { isLoading } = action.payload as ISubjectsPageSetLoadingAction;
      return { ...state, isLoading };
    }
    case ESubjectsPageAction.SUBJECT_SET_LIST: {
      const { list } = action.payload as ISubjectsPageSetListAction;
      return { ...state, list };
    }
    case ESubjectsPageAction.SUBJECT_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default subjectsPageReducer;
