import { IFormFields } from '../interface';

export const SKELETON_RESET_PASSWORD_FORM: IFormFields[] = [
  {
    title: 'Reset your password',
    loading: false,
    form: [
      {
        label: 'Old Password',
        id: 'old-password-field',
        key: 'password_old',
        placeholder: 'type your old password here',
        type: 'password',
        showPassword: false,
      },
      {
        label: 'New Password',
        id: 'new-password-field',
        key: 'password_new',
        placeholder: 'type your new password here',
        type: 'password',
        showPassword: false,
      },
      {
        label: 'Confirm Password',
        id: 'confirm-password-field',
        key: 'password_confirm',
        placeholder: 'confirm your new password here',
        type: 'password',
        showPassword: false,
      },
    ],
  },
];

export const SKELETON_SETTING_PROFILE_FORM: IFormFields[] = [
  {
    title: 'Basic Settings',
    loading: false,
    form: [
      {
        label: 'Full name',
        id: 'user-full-name-field',
        key: 'user_full_name',
        placeholder: 'type your full name here',
        type: 'text',
      },
      {
        label: 'Phone number',
        id: 'user-phone-number-field',
        key: 'user_phone_number',
        placeholder: 'type your phone number here',
        type: 'text',
      },
    ],
  },
];

export const SKELETON_SUBJECT_CONFIG_FORM: IFormFields[] = [
  {
    title: 'General Settings',
    loading: false,
    form: [
      {
        label: 'Subject name',
        id: 'subject-name-field',
        key: 'subject_name',
        placeholder: 'type your subject name/title',
        type: 'text',
      },
      {
        label: 'Semester category',
        id: 'semester-field',
        key: 'semester',
        placeholder: 'Select semester category',
        type: 'dropdown',
        options: [
          {
            key: 'semester01',
            value: 'semester_01',
            text: 'Semester one',
          },
          {
            key: 'semester02',
            value: 'semester_02',
            text: 'Semester Two',
          },
        ],
      },
      {
        label: 'Week number',
        id: 'week-number-field',
        key: 'week_number',
        placeholder: 'Select your week number category',
        type: 'dropdown',
        options: [
          {
            key: 'week01',
            value: 'week_01',
            text: 'Week one',
          },
          {
            key: 'week02',
            value: 'week_02',
            text: 'Week two',
          },
          {
            key: 'week03',
            value: 'week_03',
            text: 'Week three',
          },
          {
            key: 'week04',
            value: 'week_04',
            text: 'Week four',
          },
          {
            key: 'week05',
            value: 'week_05',
            text: 'Week five',
          },
          {
            key: 'week06',
            value: 'week_06',
            text: 'Week six',
          },
          {
            key: 'week07',
            value: 'week_07',
            text: 'Week seven',
          },
          {
            key: 'week08',
            value: 'week_08',
            text: 'Week eight',
          },
          {
            key: 'week09',
            value: 'week_09',
            text: 'Week nine',
          },
          {
            key: 'week10',
            value: 'week_10',
            text: 'Week ten',
          },
          {
            key: 'week11',
            value: 'week_11',
            text: 'Week eleven',
          },
          {
            key: 'week12',
            value: 'week_12',
            text: 'Week twelve',
          },
          {
            key: 'week13',
            value: 'week_13',
            text: 'Week thirteen',
          },
          {
            key: 'week14',
            value: 'week_14',
            text: 'Week fourteen',
          },
        ],
      },
      {
        label: 'Subject category',
        id: 'subject-category-field',
        key: 'subject_category',
        placeholder: 'Select your subject category',
        type: 'dropdown',
        options: [
          {
            key: 'be',
            value: 'back_end',
            text: 'Back end Development',
          },
          {
            key: 'fe',
            value: 'front_end',
            text: 'Front end Development',
          },
          {
            key: 'mobile',
            value: 'mobile',
            text: 'Mobile development (Hybrid)',
          },
        ],
      },
      {
        label: 'Subject ppt slide URL',
        id: 'subject-ppt-slide-field',
        key: 'subject_ppt_slide_url',
        placeholder: 'type your PPT slide URL',
        type: 'text',
      },
    ],
  },
];
