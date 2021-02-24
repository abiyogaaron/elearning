import { IMenuItems, ITab } from '../interface';

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
