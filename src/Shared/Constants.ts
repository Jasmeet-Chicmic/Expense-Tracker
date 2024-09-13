const STRING: string = 'Test';
export { STRING };

const ROUTES = {
  HOMEPAGE: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about-us',
  TESTING: "/testing",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
};

const WILDCARD_ROUTES = { /// This is a wildcard route that will match any path that is not defined in the ROUTES object.
  PUBLIC: ROUTES.LOGIN,
  PRIVATE: ROUTES.HOMEPAGE,
};

const ROUTES_CONFIG = {
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: 'Master Plan',
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    title: 'Login',
  },
  REGISTER: {
    path: ROUTES.REGISTER,
    title: 'Register',
  },
  FORGOT_PASSWORD: {
    path: ROUTES.FORGOT_PASSWORD,
    title: "Forgot Password"
  },
  RESET_PASSWORD: {
    path: ROUTES.RESET_PASSWORD,
    title: "Reset Password"
  }

};
const ALIGNMENT = {
  LEFT: 'Left',
  RIGHT: 'Right',
  CENTER: 'Center',
};
const INPUT_TYPES = {
  TEXT: 'text',
  TEXT_AREA: 'textarea',
  NUMBER: 'number',
  EMAIL: 'email',
  PASSWORD: 'password',
  SELECT: 'select',
  RICH_TEXT: 'rich-text',
  FILE_UPLOAD: 'file-upload',
  FILE: 'file',
  SWITCH: 'switch',
  CHECKBOX: 'checkbox',
  PHONE: "phone"
};
export { ROUTES, INPUT_TYPES, WILDCARD_ROUTES, ROUTES_CONFIG, ALIGNMENT };
