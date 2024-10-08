export const createUserValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "name must be a String",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Username Should be between 3-20 characters",
    },
  },

  displayName: {
    notEmpty: {
      errorMessage: "Display name cannot be empty",
    },
    isString: {
      errorMessage: "name must be a String",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Display name Should be between 3-20 characters",
    },
  },

  email: {
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
    isString: {
      errorMessage: "email must be a String",
    },
    isEmail: {
      errorMessage: "Invalid email",
    },
  },

  password: {
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
    isString: {
      errorMessage: "password must be a String",
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Password must contain at least 8 characters",
    },
  },
};

export const deleteUserValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "name must be a String",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Username Should be between 3-20 characters",
    },
  },

  password: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "name must be a String",
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Password must contain at least 8 characters",
    },
  },
};
