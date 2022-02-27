import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import path from 'path';
import apiRoutes from './api';
import passport from 'passport';
import initializePassport from './controllers/passport';
dotenv.config()

const app = express();

initializePassport(passport);

app.use(flash());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 900000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api', apiRoutes); 

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});


export default app;