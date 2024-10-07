const createPostValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "Title Cannot Be Empty",
    },
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Title must be between 5-32 characters",
    },
  },

  shortDescription: {
    notEmpty: {
      errorMessage: "Description Cannot Be Empty",
    },
    isLength: {
      options: {
        min: 10,
      },
      errorMessage: "Description should be more than 10 characters",
    },
  },

  tags: {
    notEmpty: {
      errorMessage: "Tags should not be empty",
    },
  },
};

export default createPostValidationSchema;
