import { IFormLoginPage } from './form';
import { ICommonUser, UserProfile } from './index';

export enum ECommonAction {
  COMMON_SET_USER_AUTH = 'COMMON_SET_USER_AUTH',
  COMMON_RESET_STATE = 'COMMON_RESET_STATE',
  COMMON_SET_PAGE_LOADING = 'COMMON_SET_PAGE_LOADING',
  COMMON_SET_SIDEBAR = 'COMMON_SET_SIDEBAR',
  COMMON_SET_USER_PROFILE = 'COMMON_SET_USER_PROFILE',
}

export interface ICommonSetUserAuthAction {
  user: ICommonUser;
}

export interface ICommonSetPageLoadingAction {
  pageLoading: boolean;
}

export interface ICommonSetSidebarAction {
  sidebarVisible: boolean;
}

export interface ICommonSetUserProfileAction {
  userProfile: UserProfile;
}

export type TCommonPayload =
  | ICommonSetUserAuthAction
  | ICommonSetPageLoadingAction
  | ICommonSetSidebarAction
  | ICommonSetUserProfileAction;

export interface ICommonAction {
  type: ECommonAction;
  payload: TCommonPayload;
}

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

export enum EHomePageAction {
  HOME_SET_PROGRESS = 'HOME_SET_PROGRESS',
  HOME_SET_LOADING = 'HOME_SET_LOADING',
  HOME_RESET_STATE = 'HOME_RESET_STATE',
}

export interface IHomePageSetProgressAction {
  progressUpload: number;
}

export interface IHomePageSetLoadingAction {
  isLoading: boolean;
}

export type THomePagePayload =
  | IHomePageSetProgressAction
  | IHomePageSetLoadingAction;

export interface IHomePageAction {
  type: EHomePageAction;
  payload: THomePagePayload;
}

export type TAllAction =
  | ILoginPageAction
  | ICommonAction
  | IHomePageAction;
