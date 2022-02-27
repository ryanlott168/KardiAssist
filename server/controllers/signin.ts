// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
// import auth from '../config/auth';
// import db from '../models';

// const User = db.user;

// passport.use(new GoogleStrategy({
//     clientID: auth.CLIENT_ID,
//     clientSecret: auth.CLIENT_SECRET,
//     callbackURL: auth.CALLBACK_URL,
//     passReqToCallback: true
// }, (request, accessToken, refreshToken, profile, done) =>
// {
//     User.findOne({ googleId: profile.id }, (err, user) => {
//         // if(err) console.log('Could Not find User');
//         return done(null, user);
//     });
// }
// ));

// passport.serializeUser((user, done) => {
// done(null, user);
// });

// passport.deserializeUser((user, done) => {
// done(null, user);
// });