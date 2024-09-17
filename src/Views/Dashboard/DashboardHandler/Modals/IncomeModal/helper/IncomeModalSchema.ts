
import { INPUT_TYPES } from '../../../../../../Shared/Constants';
import { FORM_VALIDATION_MESSAGES } from '../../../../../../Shared/Validations';



export const INCOME_MODAL_SCHEMA = {
    Amount: {
        type: INPUT_TYPES.TEXT,
        label: 'Income',
        className: 'col-md-12',
        placeholder: '0',
        required: true,
        schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
        },
    },
    Description: {
        type: INPUT_TYPES.TEXT,
        label: 'Description',
        className: 'col-md-12',
        placeholder: 'Description',
        required: true,
    },
};
