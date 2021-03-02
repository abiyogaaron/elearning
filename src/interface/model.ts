export interface ILoginModels {
  email: string;
  password: string;
  emailForgotPassword: string;
}

export type TRole = 'admin' | 'student';
export type TClassTime = 'pagi' | 'siang';

interface basicOptions {
  created_at: number;
  updated_at: number;
  created_by: string;
  updated_by: string;
}

export interface IUserModels extends basicOptions {
  id?: string;
  user_email: string;
  user_isVerified: boolean;
  user_full_name: string;
  user_role: TRole;
  user_status_active: boolean;
  user_phone_number: string;
  user_photo_url: string;
}

export type TWeekNumber =
  'week1' |
  'week2' |
  'week3' |
  'week4' |
  'week5' |
  'week6' |
  'week7' |
  'week8' |
  'week9' |
  'week10' |
  'week11' |
  'week12' |
  'week13' |
  'week14';

export type TSubjectCategory =
  'back_end' |
  'front_end'|
  'mobile';

export type TSemester =
  'semester_1' |
  'semester_2';

export interface ISubjectModels extends basicOptions {
  id?: string;
  subject_name: string;
  semester: TSemester;
  week_number: TWeekNumber;
  subject_category: TSubjectCategory;
  subject_ppt_slide_url: string;
}

export interface IPasswordSettingsModels {
  password_old: string;
  password_new: string;
  password_confirm: string;
}
