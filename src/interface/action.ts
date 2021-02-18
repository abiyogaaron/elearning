import { IFormLoginPage } from './form';

export enum ELoginPageAction {
  LOGIN_SET_LOADING = 'LOGIN_SET_LOADING',
  LOGIN_RESET_STATE = 'LOGIN_RESET_STATE',
  LOGIN_SET_FORM = 'LOGIN_SET_FORM',
  LOGIN_SET_ERRORS = 'LOGIN_SET_ERRORS',
}

export interface ILoginPageSetLoadingAction {
  isLoading: boolean;
}

export interface ILoginPageSetFormAction {
  form: IFormLoginPage;
}

export interface ILoginPageSetErrorsAction {
  errors: { [key: string]: string };
}

export type TLoginPagePayload =
  | ILoginPageSetLoadingAction
  | ILoginPageSetFormAction
  | ILoginPageSetErrorsAction;

export interface ILoginPageAction {
  type: ELoginPageAction;
  payload: TLoginPagePayload;
}

export type TAllAction =
  | ILoginPageAction;
