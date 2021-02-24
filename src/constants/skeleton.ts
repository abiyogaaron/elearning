import { IFormFields } from '../interface';

export const SKELETON_FORM_FIELDS: IFormFields[] = [
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
            value: 'semester_1',
            text: 'Semester one',
          },
          {
            key: 'semester02',
            value: 'semester_2',
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
            value: 'week_1',
            text: 'Week one',
          },
          {
            key: 'week02',
            value: 'week_2',
            text: 'Week two',
          },
          {
            key: 'week03',
            value: 'week_3',
            text: 'Week three',
          },
          {
            key: 'week04',
            value: 'week_4',
            text: 'Week four',
          },
          {
            key: 'week05',
            value: 'week_5',
            text: 'Week five',
          },
          {
            key: 'week06',
            value: 'week_6',
            text: 'Week six',
          },
          {
            key: 'week07',
            value: 'week_7',
            text: 'Week seven',
          },
          {
            key: 'week08',
            value: 'week_8',
            text: 'Week eight',
          },
          {
            key: 'week09',
            value: 'week_9',
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
