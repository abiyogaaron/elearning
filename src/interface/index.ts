import { SemanticICONS } from 'semantic-ui-react';

export interface IAuthFireBaseResponse {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  uid: string;
  phoneNumber: string | null;
  isAnonymous: boolean;
  token: string;
}

export interface ICommonUser {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  uid: string;
  phoneNumber: string | null;
  isAnonymous: boolean;
  lastLoginAt: number;
  createdAt: number;
}

export interface IMenuItems {
  to: string;
  title: string;
  icon: SemanticICONS;
}

export type IFieldType =
  |'text'
  | 'radio'
  | 'select'
  | 'checkbox'
  | 'dropdown'
  | 'password';

export interface IFieldSelectOptions {
  key: string;
  value: string;
  text: string;
}

export interface IFields {
  label: string;
  id: string;
  key: string;
  type: IFieldType;
  placeholder?: string;
  options?: IFieldSelectOptions[]
  labelInput?: string;
  showPassword?: boolean;
}

export interface IFormFields {
  title?: string;
  loading: boolean;
  form: IFields[]
}

export type ITabType =
  'Basic config' |
  'Subject list' |
  'Profile setting' |
  'Reset password';

export interface ITab {
  name: string;
  to: string;
}
