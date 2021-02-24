export interface ILoginModels {
  email: string;
  password: string;
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

export interface ISubjectModels {
  id?: string;
  subject_name: string;
  semester: TSemester;
  week_number: TWeekNumber;
  subject_category: TSubjectCategory;
  subject_ppt_slide_url: string;
  created_at: number;
  updated_at: number;
  created_by: string;
  updated_by: string;
}
