import * as yup from 'yup';

const required = yup.string().required('This field is required');

const requiredEmail = yup.string()
  .email('This field is not an email')
  .required('This field is required');

const url = yup
  .string()
  .url('Invalid url format')
  .required('This field is required');

export const LOGIN_VALIDATION_RULES = yup.object().shape({
  email: requiredEmail,
  password: required,
});

export const SUBJECT_CONFIG_VALIDATION_RULES = yup.object().shape({
  subject_name: required,
  semester: required,
  week_number: required,
  subject_category: required,
  subject_ppt_slide_url: url,
});
