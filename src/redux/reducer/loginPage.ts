import { ILoginPageState } from '../../interface/state';
import {
  ILoginPageSetErrorsAction,
  ILoginPageSetFormAction,
  ILoginPageSetLoadingAction,
  ILoginPageAction,
  ELoginPageAction,
} from '../../interface/action';

const INITIAL_STATE: ILoginPageState = {
  isLoading: false,
  form: {
    email: '',
    password: '',
    emailForgotPassword: '',
  },
  errors: {},
};

const loginPageReducer = (state = INITIAL_STATE, action: ILoginPageAction)
: ILoginPageState => {
  switch (action.type) {
    case ELoginPageAction.LOGIN_SET_LOADING: {
      const { isLoading } = action.payload as ILoginPageSetLoadingAction;
      return { ...state, isLoading };
    }
    case ELoginPageAction.LOGIN_SET_FORM: {
      const { form } = action.payload as ILoginPageSetFormAction;
      return { ...state, form };
    }
    case ELoginPageAction.LOGIN_SET_ERRORS: {
      const { errors } = action.payload as ILoginPageSetErrorsAction;
      return { ...state, errors };
    }
    case ELoginPageAction.LOGIN_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default loginPageReducer;
