const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const cors = require('cors'); // Add this line



passport.use(
  new GoogleStrategy(
    {
      callbackURL: 'http://localhost:3008/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      passReqToCallback: true, // Pass the req object to the callback
    },
    (req, accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // Handle the authentication logic without session support
      // You can perform actions based on the profile data
      // For example, create or find a user in your database

      // Example: Create or find a user without sessions
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        // Add other profile information as needed
      };

      // Pass the user to the done callback
      done(null, user);
    }
  )
);
