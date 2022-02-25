import express from 'express';
import passport from 'passport';
import initializePassport from '../controllers/passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import auth from '../config/auth';
import cors from 'cors';
import db from '../models';
import { userInfo } from 'os';
initializePassport(passport);
const User = db.user;

const router = express.Router();

router.get('/google/callback', passport.authenticate('google',
    {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
);
router.get('/', (req, res) => {
    res.send({ message: "Auth" });
});

router.get('/failure', (req, res) => {
    res.send('something went wrong');
});

router.post('/signup', (req, res) => {
    console.log(req.body);
    res.send({ message: "Signed UP!" });
});


// router.post('/login', (req, res) => {
//     console.log(req.body);
//     res.send({ message: "Logged IN!" });
// });

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/api/auth/login/success',
    failureRedirect: '/api/auth/login/fail'
}));

router.get('/login/success', (req, res) => {
    res.redirect('/api/user')
});

router.get('/login/fail', (req, res) => {
    res.sendStatus(401);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(err => {
        console.log(err);
    })
    res.send('Goodbye!');
})

export default router;