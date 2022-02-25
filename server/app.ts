import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import cors from 'cors';
import path from 'path';
import auth from './config/auth';
import apiRoutes from './api';
import mw from './middleware';
import passport from 'passport';
import initializePassport from './controllers/passport'
dotenv.config()

initializePassport(passport);

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));


const  { isLoggedIn } = mw.authMiddleware;
app.use(flash());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 900000 }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use('/api', apiRoutes);

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});


export default app;