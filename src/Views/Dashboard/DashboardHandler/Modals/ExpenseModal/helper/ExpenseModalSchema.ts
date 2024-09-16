
import { INPUT_TYPES } from '../../../../../../Shared/Constants';



export const EXPENSE_MODAL_SCHEMA = {
    Amount: {
        type: INPUT_TYPES.TEXT,
        label: 'How Much Did You Spent?',
        className: 'col-md-12',
        placeholder: '0',
        required: true,
        schema: {

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
