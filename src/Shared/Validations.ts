export const FORM_VALIDATION_MESSAGES = (...args: any[]) => ({
  REQUIRED: `${args[0] || "This"} is required.`,
  MIN_LENGTH: `This input requires a minimum of ${args[0]} characters.`,
  MAX_LENGTH: `This input exceeds the maximum length of ${args[0]} characters.`,
  VALID_EMAIL: 'Please enter a valid email address.',
  VALID_PASSWORD: 'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  VALID_USERNAME: 'The username must be 4-18 characters long and contain only letters, numbers, or special characters.',
  CONFIRM_PASSWORD: 'The passwords do not match.',
  VIDEO_NAME: 'The filename must be between 5 and 18 alphanumeric characters. Special characters are not allowed.',
  VALID_LINK: 'Please enter a valid link.',
  ANSWER_REQUIRED: 'Please add your answer to join this squad.',
  LONGER_ANSWER_REQUIRED: 'Please provide a longer answer.',
  MAX_NUMBER: `The maximum value should be less than ${args[0]}.`,
  ONLY_NUMBERS: 'Please enter only numbers.',
  

});

export const VALIDATION_REGEX = {
  EMAIL: /^[a-zA-Z0-9][\w.-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]{8,}$/,
  NUMBER: /\d+/g,
  SPECIAL_CHARACTERS_NOT_ALLOWED: /^[a-zA-Z0-9\s]+$/,
  SPECIAL_CHARACTERS_AND_SPACES_NOT_ALLOWED: /^[a-zA-Z0-9]+$/,
  VALID_LINK:
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/,
  USERNAME: /^(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;'"\\|,.<>?~-]+$/
};
