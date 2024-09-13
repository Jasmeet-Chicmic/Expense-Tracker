import React, { Ref } from 'react';
import { Control, FieldErrorsImpl } from 'react-hook-form';
import { INPUT_TYPES } from '../../../../Shared/Constants';


export function ErrorComponent({
  error,
  render,
}: {
  error: FieldErrorsImpl<object> | undefined;
  render?: (error: FieldErrorsImpl<object> | undefined) => JSX.Element;
}) {
  if (render) {
    return render(error);
  }
  return (
    <span className="block text-red text-md mt-1">
      {(error as { message: string })?.message}
    </span>
  );
}

interface TextFieldProps {
  type: string;
  placeholder?: string;
  className?: string;
  control?: Control;
  accept?: string;
  [key: string]: unknown;
}

const TextField = React.forwardRef(function TextField(
  {
    type,
    placeholder,
    className = 'form-control',
    control,
    accept,
    value,
    ...otherProps
  }: TextFieldProps,
  ref: Ref<HTMLInputElement>
) {
  switch (type) {
    case INPUT_TYPES.TEXT_AREA:
      return (
        <textarea
          className={className}
          placeholder={placeholder}
          ref={ref as Ref<HTMLTextAreaElement>}
          {...otherProps}
        />
      );
    case INPUT_TYPES.TEXT:
      return (
        <input
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={className}
          {...otherProps}
        />
      );
   
   
    default:
      return (
        <input
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={className}
          {...otherProps}
        />
      );
  }
});

export default TextField;

// {
//   "profileName": "string",
//   "profileData": [
//     {
//       "name": "string",
//       "description": "string",
//       "url": "string",
//       "filePath": [
//         "string"
//       ],
//       "skills": [
//         "string"
//       ]
//     }
//   ],
//   "profileDescription": "string",
//   "skills": [
//     "string"
//   ],
//   "filePath": [
//     "string"
//   ],
//   "isAgencyProfile": false
// }
