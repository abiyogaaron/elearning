import * as yup from 'yup';

const required = yup.string().required('This field is required');
const requiredEmail = yup.string()
  .email('This field is not an email')
  .required('This field is required');

export const LOGIN_VALIDATION_RULES = yup.object().shape({
  email: requiredEmail,
  password: required,
});
