import { IMenuItems, ITab } from '../interface';

export const PROMPT_MESSAGE = 'Are you sure want to leave this page ?';

export enum APP_PATH {
  LOGIN_PAGE = '/',
  HOME_PAGE = '/dashboard',
  SUBJECTS_PAGE = '/subjects',
  SUBJECT_CONFIG_PAGE = '/subjects/create',
  SUBJECT_EDIT_CONFIG_PAGE = '/subjects/:subjectId/config',
  PROFILE_SETTINGS_PAGE = '/settings/profile',
  PROFILE_RESET_PASSWORD = '/settings/reset-password',
}

export const BLOCKED_ACCESS_PAGES = [
  APP_PATH.LOGIN_PAGE,
];

export const MENU_LIST_ADMIN: IMenuItems[] = [
  {
    title: 'Dashboard',
    to: '/dashboard',
    icon: 'home',
  },
  {
    title: 'Subjects',
    to: '/subjects',
    icon: 'book',
  },
  {
    title: 'Users',
    to: '/users',
    icon: 'users',
  },
];

export const TAB_LIST_SUBJECTS: ITab[] = [
  {
    name: 'Basic config',
    to: '/subjects/create',
  },
  {
    name: 'Subject list',
    to: '/subjects',
  },
];

export const TAB_LIST_PROFILE_SETTINGS: ITab[] = [
  {
    name: 'Profile setting',
    to: '/settings/profile',
  },
  {
    name: 'Reset password',
    to: '/settings/reset-password',
  },
];
