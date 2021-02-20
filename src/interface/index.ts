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
