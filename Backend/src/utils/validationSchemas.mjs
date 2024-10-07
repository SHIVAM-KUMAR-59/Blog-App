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

  author: {
    notEmpty: {
      errorMessage: "Author Cannnot be Empty",
    },
  },

  content: {
    notEmpty: {
      errorMessage: "Content Cannnot be Empty",
    },
    isLength: {
      options: {
        min: 10,
      },
      errorMessage: "Content should contain more than 10 characters",
    },
  },
};

export default createPostValidationSchema;
