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

export const delete_and_Logout_UserValidationSchema = {
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

export const createPostValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "Title cannot be empty",
    },
    isString: {
      errorMessage: "Title must be a String",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Title Should be between 3-20 characters",
    },
  },

  shortDescription: {
    notEmpty: {
      errorMessage: "Description cannot be empty",
    },
    isString: {
      errorMessage: "Description must be a String",
    },
    isLength: {
      options: {
        min: 10,
      },
      errorMessage: "TitDescriptionle Should be minimum 10 characters",
    },
  },

  content: {
    notEmpty: {
      errorMessage: "Description cannot be empty",
    },
    isString: {
      errorMessage: "Description must be a String",
    },
  },

  tags: {
    notEmpty: {
      errorMessage: "Description cannot be empty",
    },
  },
};
