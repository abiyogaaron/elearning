import { ISubjectConfigPageState } from '../../interface/state';
import {
  ISubjectConfigPageSetErrorsAction,
  ISubjectConfigPageSetFormAction,
  ISubjectConfigPageSetFormDefaultAction,
  ISubjectConfigPageSetLoadingAction,
  ISubjectConfigPageAction,
  ESubjectConfigPageAction,
} from '../../interface/action';
import Subject from '../../models/Subject';

const INITIAL_STATE: ISubjectConfigPageState = {
  isLoading: false,
  form: new Subject().getAttributes(),
  formDefault: new Subject().getAttributes(),
  errors: {},
};

const subjectConfigPageReducer = (state = INITIAL_STATE, action: ISubjectConfigPageAction)
: ISubjectConfigPageState => {
  switch (action.type) {
    case ESubjectConfigPageAction.SUBJECT_SET_LOADING: {
      const { isLoading } = action.payload as ISubjectConfigPageSetLoadingAction;
      return { ...state, isLoading };
    }
    case ESubjectConfigPageAction.SUBJECT_SET_FORM: {
      const { form } = action.payload as ISubjectConfigPageSetFormAction;
      return { ...state, form };
    }
    case ESubjectConfigPageAction.SUBJECT_SET_FORM_DEFAULT: {
      const { formDefault } = action.payload as ISubjectConfigPageSetFormDefaultAction;
      return { ...state, formDefault };
    }
    case ESubjectConfigPageAction.SUBJECT_SET_ERRORS: {
      const { errors } = action.payload as ISubjectConfigPageSetErrorsAction;
      return { ...state, errors };
    }
    case ESubjectConfigPageAction.SUBJECT_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default subjectConfigPageReducer;
