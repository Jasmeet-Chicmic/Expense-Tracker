
import { INPUT_TYPES } from '../../../../../Shared/Constants';
import { VALIDATION_REGEX, FORM_VALIDATION_MESSAGES } from '../../../../../Shared/Validations';

export const FORGOT_PASSWORD_SCHEMA = {
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
    }

};
