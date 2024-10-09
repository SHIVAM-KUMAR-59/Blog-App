import bcrypt from "bcrypt";
import { User } from "../Schema/userSchema.mjs";

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

// Function to verify password
export const verifyPassword = (inputPassword, storedPassword) => {
  return bcrypt.compareSync(inputPassword, storedPassword); // Compares the input password with the stored hashed password
};

// // Function to check if the user is logged in or not
// export const checkUserLoggedIn = async (req, res, next) => {
//   // Check if the login cookie exists
//   if (!req.cookies.login) {
//     return res.status(401).json({ message: "User is not logged in" });
//   }

//   // Check if the username in the cookie exists in the database
//   const user = await User.findOne({ username: req.cookies.login });

//   if (!user) {
//     return res.status(401).json({ message: "Invalid user. Please log in." });
//   }

//   // If both checks pass, allow the request to proceed
//   req.user = user; // Optionally attach the user object to req for future use
//   next(); // Pass control to the next middleware or route handler
// };
