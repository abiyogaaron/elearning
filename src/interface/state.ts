import { IFormLoginPage } from './form';
import { ICommonUser, UserProfile } from './index';

export interface ILoginPageState {
  isLoading: boolean;
  form: IFormLoginPage;
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

export interface IAppState {
  loginPage: ILoginPageState;
  common: ICommonState;
  homePage: IHomeState;
}
