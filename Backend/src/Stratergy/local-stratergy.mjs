import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../Schema/userSchema.mjs";
import bcrypt from "bcrypt";

// Registers a function used to serialize user objects into the session.
passport.serializeUser((user, done) => {
  console.log("Inside Serialize User Function");
  console.log(`User: ${user}`);
  done(null, user.username);
});

// Registers a function used to deserialize user objects out of the session.
passport.deserializeUser(async (username, done) => {
  console.log("Inside Desrerialize User Function");
  console.log(`Deserializing user with username : ${username}`);
  try {
    const findUser = await User.findOne({ username: username });
    if (!findUser) {
      throw new Error("User Not Found");
    }
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

// Main Validation function
passport.use(
  new Strategy(async (username, password, done) => {
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    try {
      const findUser = await User.findOne({ username });

      // Check if user exists
      if (!findUser) {
        throw new Error("User Not Found");
      }
      // Check if password is correct
      const isValidPassword = bcrypt.compareSync(password, findUser.password);
      if (!isValidPassword) {
        throw new Error("Invalid Password");
      }
      // Return user
      return done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);

export default passport;
