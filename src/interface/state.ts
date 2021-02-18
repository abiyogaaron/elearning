import { IFormLoginPage } from './form';

export interface ILoginPageState {
  isLoading: boolean;
  form: IFormLoginPage;
  errors: { [key: string]: string };
}

export interface IAppState {
  loginPage: ILoginPageState;
}
