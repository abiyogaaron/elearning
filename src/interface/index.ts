import { SemanticICONS } from 'semantic-ui-react';

export type TRole = 'admin' | 'student';
export type TStatus = 'active' | 'terminated';

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

export interface UserProfile {
  id: string;
  email: string;
  isVerified: boolean;
  name: string | null;
  role: TRole;
  status: TStatus;
}

export interface IMenuItems {
  to: string;
  title: string;
  icon: SemanticICONS;
}

export type IFieldType = 'text' | 'radio' | 'select' | 'checkbox' | 'dropdown';

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
}

export interface IFormFields {
  title: string;
  loading: boolean;
  form: IFields[]
}

export type ITabType =
  'Basic config' |
  'Subject list';

export interface ITab {
  name: string;
  to: string;
}
