import { ValidationError, SchemaOf } from 'yup';

class Validator {
  public static getErrorMessages(err: ValidationError) {
    const errorMessages = {};
    const e: ValidationError[] = err.inner;
    for (let i = 0; i < e.length; i++) {
      errorMessages[e[i].path || i] = e[i].message;
    }
    return errorMessages;
  }

  public static validate(value: object, rules: SchemaOf<any>)
    : Promise<any> {
    return rules.validate(value, {
      abortEarly: false,
    });
  }
}

export default Validator;
