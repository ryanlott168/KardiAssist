import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth2';
import bcrypt from 'bcryptjs';
import auth from '../config/auth';
import db from'../models';
import { stringify } from 'querystring';
const User = db.user;
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;


function initialize (passport) {
    const authenticateUserLocal = async (email: string, password: string , done) => {
        console.log(arguments);
        const user = await User.findOne({ email });
        console.log(user)
        if(user === null) {
            return done(null, false, { message: 'No user with that email' });
        }

        try {
            // if (await bcrypt.compare(password, user.password)) {
            if (password === user.password) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            done(e);
        }
    }

    // const authenticateUserGoogleAuth2 = async (request, accessToken, refreshToken, profile, done) => {
    //     const user = await User.findOne({ googleId: profile.id });
    //     if(user === null) {
    //         return done(null, false, { message: 'No user with that email' });
    //     } else {
    //         return done(null, user);
    //     }
    // }
    // interface GoogleStrategyConfigTypes {
    //     clientID: string,
    //     clientSecret: string,
    //     callbackURL: string,
    //     passReqToCallback: true
    // }

    // const googleStrategyConfig: GoogleStrategyConfigTypes = {
    //     clientID: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     callbackURL: process.env.GOOGLE_CALLBACK_URL,
    //     passReqToCallback: true
    // }


    passport.use('local', new LocalStrategy({ usernameField: 'email' }, authenticateUserLocal))
    // passport.use('google', new GoogleStrategy(googleStrategyConfig, authenticateUserGoogleAuth2))
    passport.serializeUser((user, done) => { done(null, user); })
    passport.deserializeUser((user, done) => { done(null, user); })
}

export default initialize;