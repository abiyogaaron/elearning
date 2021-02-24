import { ICommonUser, UserProfile } from './index';
import { ISubjectModels, ILoginModels } from './model';

export interface ILoginPageState {
  isLoading: boolean;
  form: ILoginModels;
  errors: { [key: string]: string };
}

export interface ICommonState {
  user: ICommonUser;
  pageLoading: boolean;
  sidebarVisible: boolean;
  userProfile: UserProfile;
}

export interface IHomeState {
  progressUpload: number;
  isLoading: boolean;
}

export interface ISubjectConfigPageState {
  isLoading: boolean;
  form: ISubjectModels;
  errors: { [key: string]: string };
}

export interface ISubjectsPageState {
  isLoading: boolean;
  list: ISubjectModels[];
}

export interface IAppState {
  loginPage: ILoginPageState;
  common: ICommonState;
  homePage: IHomeState;
  subjectConfigPage: ISubjectConfigPageState;
  subjectsPage: ISubjectsPageState;
}
