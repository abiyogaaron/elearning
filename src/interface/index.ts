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
