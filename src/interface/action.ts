import {
  ILoginModels, ISubjectModels, IUserModels, IPasswordSettingsModels,
} from './model';
import { ICommonUser } from './index';
// ----COMMON ACTION----
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
  userProfile: IUserModels;
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

// ----LOGIN PAGE ACTION----
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
  form: ILoginModels;
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

// ----HOME PAGE ACTION----
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

// ----SUBJECT CONFIG PAGE ACTION----
export enum ESubjectConfigPageAction {
  SUBJECT_SET_LOADING = 'SUBJECT_SET_LOADING',
  SUBJECT_SET_FORM = 'SUBJECT_SET_FORM',
  SUBJECT_SET_FORM_DEFAULT = 'SUBJECT_SET_FORM_DEFAULT',
  SUBJECT_SET_ERRORS = 'SUBJECT_SET_ERRORS',
  SUBJECT_RESET_STATE = 'SUBJECT_RESET_STATE',
}

export interface ISubjectConfigPageSetLoadingAction {
  isLoading: boolean;
}

export interface ISubjectConfigPageSetFormAction {
  form: ISubjectModels;
}

export interface ISubjectConfigPageSetFormDefaultAction {
  formDefault: ISubjectModels;
}

export interface ISubjectConfigPageSetErrorsAction {
  errors: { [key: string]: string };
}

export type TSubjectConfigPagePaylod =
  | ISubjectConfigPageSetLoadingAction
  | ISubjectConfigPageSetFormAction
  | ISubjectConfigPageSetFormDefaultAction
  | ISubjectConfigPageSetErrorsAction;

export interface ISubjectConfigPageAction {
  type: ESubjectConfigPageAction;
  payload: TSubjectConfigPagePaylod;
}

// ----SUBJECT PAGE ACTION----
export enum ESubjectsPageAction {
  SUBJECT_SET_LOADING = 'SUBJECT_SET_LOADING',
  SUBJECT_SET_LIST = 'SUBJECT_SET_LIST',
  SUBJECT_RESET_STATE = 'SUBJECT_RESET_STATE',
}

export interface ISubjectsPageSetLoadingAction {
  isLoading: boolean;
}

export interface ISubjectsPageSetListAction {
  list: ISubjectModels[];
}

export type TSubjectsPagePayload =
  | ISubjectsPageSetLoadingAction
  | ISubjectsPageSetListAction;

export interface ISubjectsPageAction {
  type: ESubjectsPageAction;
  payload: TSubjectsPagePayload;
}

// ----PROFILE SETTING PAGE ACTION----
export enum EProfileSettingsPageAction {
  PROFILE_SETTING_SET_ERRORS = 'PROFILE_SETTING_SET_ERRORS',
  PROFILE_SETTING_SET_FORM_DEFAULT = 'PROFILE_SETTING_SET_FORM_DEFAULT',
  PROFILE_SETTING_SET_FORM = 'PROFILE_SETTING_SET_FORM',
  PROFILE_SETTING_SET_LOADING = 'PROFILE_SETTING_SET_LOADING',
  PROFILE_SETTING_RESET_STATE = 'PROFILE_SETTING_RESET_STATE',
}

export interface IProfileSettingPageSetLoadingAction {
  isLoading: boolean;
}

export interface IProfileSettingPageSetFormAction {
  form: IUserModels;
}

export interface IProfileSettingPageSetFormDefaultAction {
  formDefault: IUserModels;
}

export interface IProfileSettingPageErrorsAction {
  errors: { [key: string]: string };
}

export type TProfileSettingsPagePayload =
  | IProfileSettingPageSetLoadingAction
  | IProfileSettingPageSetFormAction
  | IProfileSettingPageSetFormDefaultAction
  | IProfileSettingPageErrorsAction;

export interface IProfileSettingsPageAction {
  type: EProfileSettingsPageAction;
  payload: TProfileSettingsPagePayload;
}

// ----SETTING PASSWORD PAGE ACTION----
export enum EPasswordSettingsPageAction {
  PASSWORD_SETTING_SET_ERRORS = 'PASSWORD_SETTING_SET_ERRORS',
  PASSWORD_SETTING_SET_FORM = 'PASSWORD_SETTING_SET_FORM',
  PASSWORD_SETTING_SET_LOADING = 'PASSWORD_SETTING_SET_LOADING',
  PASSWORD_SETTING_RESET_STATE = 'PASSWORD_SETTING_RESET_STATE',
}

export interface IPasswordSettingPageSetLoadingAction {
  isLoading: boolean;
}

export interface IPasswordSettingPageSetFormAction {
  form: IPasswordSettingsModels;
}

export interface IPasswordSettingPageErrorsAction {
  errors: { [key: string]: string };
}

export type TPasswordSettingsPagePayload =
  | IPasswordSettingPageSetLoadingAction
  | IPasswordSettingPageSetFormAction
  | IPasswordSettingPageErrorsAction;

export interface IPasswordSettingsPageAction {
  type: EPasswordSettingsPageAction;
  payload: TPasswordSettingsPagePayload;
}

export type TAllAction =
| ILoginPageAction
| ICommonAction
| IHomePageAction
| ISubjectConfigPageAction
| ISubjectsPageAction
| IProfileSettingsPageAction
| IPasswordSettingsPageAction;
