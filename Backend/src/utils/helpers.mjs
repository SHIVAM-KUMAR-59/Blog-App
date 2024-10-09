import bcrypt from "bcrypt";

const saltRounds = 10;

// Function to hash the password
export const hashPassword = (password) => {
  // Generate the salt
  const salt = bcrypt.genSaltSync(saltRounds);
  // console.log(salt);
  // Hash the password
  return bcrypt.hashSync(password, salt);
};

// Function to compare passwords
export const comparePassword = (plainPassword, hashedPassword) => {
  if (!plainPassword || !hashedPassword) {
    throw new Error("Both plain password and hashed password are required");
  }

  const isMatch = bcrypt.compareSync(plainPassword, hashedPassword);
  return isMatch;
};

// Helper function to check if user is authenticated and match username
export const checkAuthAndMatchUser = (req, res, name) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ message: "Not authenticated. Please log in." });
  }
  if (req.user.username !== name) {
    return res
      .status(403)
      .json({ message: "Forbidden: You can only modify your own account." });
  }
  return true; // Return true if authenticated and username matches
};

// Helper function to verify user password
export const verifyPassword = async (inputPassword, user) => {
  return await bcrypt.compare(inputPassword, user.password);
};
