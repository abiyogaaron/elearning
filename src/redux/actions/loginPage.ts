// import { ThunkAction } from 'redux-thunk';
// import { IAppState } from '../../interface/state';
import {
  // TAllAction,
  ELoginPageAction,
  ILoginPageAction,
} from '../../interface/action';

// const setLoading = (isLoading: boolean): ILoginPageAction => ({
//   type: ELoginPageAction.LOGIN_SET_LOADING,
//   payload: { isLoading },
// });

export const setErrors = (errors: { [key: string]: string }): ILoginPageAction => ({
  type: ELoginPageAction.LOGIN_SET_ERRORS,
  payload: { errors },
});

export const resetStateData = () => ({
  type: ELoginPageAction.LOGIN_RESET_STATE,
});

// export const loginAuthentication = (
//   email: string,
//   password: string,
// ): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch, getState) => {
//   try {
//     dispatch(setLoading(true));
//   }catch (err) {

//   } finally {
//     dispatch(setLoading(false))
//   }
// }
