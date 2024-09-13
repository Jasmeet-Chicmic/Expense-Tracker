
import { INPUT_TYPES } from '../../../../../Shared/Constants';
import { VALIDATION_REGEX, FORM_VALIDATION_MESSAGES } from '../../../../../Shared/Validations';

export const RESET_PASSWORD_SCHEMA = {

    password: {
        type: INPUT_TYPES.PASSWORD,
        label: 'Password',
        className: 'col-md-12',
        placeholder: 'Password',
        schema: {
            required: FORM_VALIDATION_MESSAGES("Password").REQUIRED,
            pattern: {
                value: VALIDATION_REGEX.PASSWORD,
                message: FORM_VALIDATION_MESSAGES().VALID_PASSWORD,
            },
        },
    },
    confirmPassword: {
        type: INPUT_TYPES.PASSWORD,
        label: 'confirm Password',
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
