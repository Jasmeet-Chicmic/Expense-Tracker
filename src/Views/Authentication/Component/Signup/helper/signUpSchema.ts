
import { INPUT_TYPES } from '../../../../../Shared/Constants';
import { VALIDATION_REGEX, FORM_VALIDATION_MESSAGES } from '../../../../../Shared/Validations';

export const SIGN_UP_FORM_SCHEMA = {
  username: {
    type: INPUT_TYPES.TEXT,
    label: 'Username',
    className: 'col-md-12',
    placeholder: 'Username',
    schema: {
      required: FORM_VALIDATION_MESSAGES().VALID_USERNAME,
      pattern: {
        value: VALIDATION_REGEX.USERNAME,
        message: FORM_VALIDATION_MESSAGES().VALID_USERNAME,
      },
    },
  },
  email: {
    type: INPUT_TYPES.EMAIL,
    label: 'Email',
    className: 'col-md-12',
    placeholder: 'Email',
    schema: {
      required: FORM_VALIDATION_MESSAGES().VALID_EMAIL,
      pattern: {
        value: VALIDATION_REGEX.EMAIL,
        message: FORM_VALIDATION_MESSAGES().VALID_EMAIL,
      },
    },
  },
  password: {
    type: INPUT_TYPES.PASSWORD,
    label: 'Password',
    className: 'col-md-12',
    placeholder: 'Password',
    schema: {
      required: FORM_VALIDATION_MESSAGES("Password").REQUIRED,

    },
  },
  confirmPassword: {
    type: INPUT_TYPES.PASSWORD,
    label: 'ConfirmPassword',
    className: 'col-md-12',
    placeholder: 'Confirm Password',
    schema: (_: any, newPassword: string) => ({
      required: FORM_VALIDATION_MESSAGES("Password").REQUIRED,
      validate: (val: string) => {
        if (newPassword !== val) {
          return FORM_VALIDATION_MESSAGES("Password").CONFIRM_PASSWORD;
        }
        return true;
      },
    }),
  },
};
