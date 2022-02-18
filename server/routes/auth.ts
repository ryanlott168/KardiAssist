import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import auth from '../config/auth';
import db from '../models';

const User = db.user;

const router = express.Router();

router.get('/google',  passport.authenticate('google', { scope: ['email', 'profile']}, (req, res) => {

}));
router.get('/google/callback', passport.authenticate('google', 
    { 
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
);

router.get('/failure', (req, res) => {
    res.send('something went wrong');
});

router.post('/signup', (req, res) => {
    console.log(req.body);
    res.send({ message: "Signed UP!" });
});

router.post('/login', (req, res) => {
    console.log(req.body);
    res.send({ message: "Logged IN!" });
});

router.get('/hi', (req, res) => {
    res.send({ message: "Hello" });
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(err => {
        console.log(err);
    })
    res.send('Goodbye!');
})
 
export default router;