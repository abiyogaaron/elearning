import * as yup from 'yup';

const phoneRegExp = /^(^\+62\s?|^08)(\d{3,4}-?){2}\d{3,4}$/g;

const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;

const required = yup.string().required('This field is required');

const requiredEmail = yup.string()
  .email('This field is not an email')
  .required('This field is required');

const url = yup
  .string()
  .url('Invalid url format')
  .required('This field is required');

const phoneNumber = yup
  .string()
  .matches(phoneRegExp, 'This field is need to be indonesian phone number')
  .required('This field is required');

const confirmPassword = yup
  .string()
  .oneOf([yup.ref('password_new'), null], 'Confirm password must match new password field')
  .required('This field is required');

const password = yup
  .string()
  .matches(
    passwordRegExp,
    'Minimum 8 characters, at least one upper case letter, one lower case letter, one digit number and one special character',
  )
  .required('This field is required');

export const LOGIN_VALIDATION_RULES = yup.object().shape({
  email: requiredEmail,
  password: required,
});

export const FORGOT_PASSWORD_VALIDATION_RULES = yup.object().shape({
  emailForgotPassword: requiredEmail,
});

export const SUBJECT_CONFIG_VALIDATION_RULES = yup.object().shape({
  subject_name: required,
  semester: required,
  week_number: required,
  subject_category: required,
  subject_ppt_slide_url: url,
});

export const PROFILE_SETTINGS_CONFIG_VALIDATION_RULES = yup.object().shape({
  user_full_name: required,
  user_phone_number: phoneNumber,
});

export const PASSWORD_SETTING_CONFIG_VALIDATION_RULES = yup.object().shape({
  password_old: required,
  password_new: password,
  password_confirm: confirmPassword,
});
