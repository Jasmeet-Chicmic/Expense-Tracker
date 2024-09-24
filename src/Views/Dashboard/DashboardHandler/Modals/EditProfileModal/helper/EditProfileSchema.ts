
import { INPUT_TYPES } from '../../../../../../Shared/Constants';
import { FORM_VALIDATION_MESSAGES, VALIDATION_REGEX } from '../../../../../../Shared/Validations';



export const EDIT_PROFILE_SCHEMA = {
    Name: {
        type: INPUT_TYPES.TEXT,
        label: '',
        className: 'col-md-12',
        placeholder: 'Name',
        required: true,
        schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
            pattern: {
                value: VALIDATION_REGEX.USERNAME,
                message: FORM_VALIDATION_MESSAGES().VALID_USERNAME,
              },
        },
    },

};
