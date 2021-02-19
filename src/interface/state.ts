import { IFormLoginPage } from './form';
import { ICommonUser } from './index';

export interface ILoginPageState {
  isLoading: boolean;
  form: IFormLoginPage;
  errors: { [key: string]: string };
}

export interface ICommonState {
  user: ICommonUser;
  pageLoading: boolean;
}

export interface IAppState {
  loginPage: ILoginPageState;
  common: ICommonState;
}
