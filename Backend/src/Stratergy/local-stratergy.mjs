import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../Schema/userSchema.mjs";
import bcrypt from "bcrypt";

// Registers a function used to serialize user objects into the session.
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Registers a function used to deserialize user objects out of the session.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Main Validation function
passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      // Check if user exists
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      // Check if password is correct
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return done(null, false, { message: "Invalid password" });
      }
      // Return user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

export default passport;
