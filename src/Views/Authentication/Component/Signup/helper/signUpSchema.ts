
import { INPUT_TYPES } from '../../../../../Shared/Constants';
import { VALIDATION_REGEX ,FORM_VALIDATION_MESSAGES} from '../../../../../Shared/Validations';

export const SIGN_UP_FORM_SCHEMA = {
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
};
