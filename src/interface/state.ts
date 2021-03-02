import { ICommonUser } from './index';
import {
  ISubjectModels,
  ILoginModels,
  IUserModels,
  IPasswordSettingsModels,
} from './model';

export interface ILoginPageState {
  isLoading: boolean;
  form: ILoginModels;
  errors: { [key: string]: string };
}

export interface ICommonState {
  user: ICommonUser;
  pageLoading: boolean;
  sidebarVisible: boolean;
  userProfile: IUserModels;
}

export interface IHomeState {
  progressUpload: number;
  isLoading: boolean;
}

export interface ISubjectConfigPageState {
  isLoading: boolean;
  form: ISubjectModels;
  formDefault: ISubjectModels;
  errors: { [key: string]: string };
}

export interface ISubjectsPageState {
  isLoading: boolean;
  list: ISubjectModels[];
}

export interface IProfileSettingsPageState {
  isLoading: boolean;
  form: IUserModels;
  formDefault: IUserModels;
  errors: { [key: string]: string };
}

export interface IPasswordSettingsPageState {
  isLoading: boolean;
  form: IPasswordSettingsModels;
  formDefault: IPasswordSettingsModels;
  errors: { [key: string]: string };
}

export interface IAppState {
  loginPage: ILoginPageState;
  common: ICommonState;
  homePage: IHomeState;
  subjectConfigPage: ISubjectConfigPageState;
  subjectsPage: ISubjectsPageState;
  profileSettingsPage: IProfileSettingsPageState;
  passwordSettingsPage: IPasswordSettingsPageState;
}
