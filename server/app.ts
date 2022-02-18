import 'dotenv/config'
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import auth from './config/auth';
import routes from './routes';
import mw from './middleware';
import passport from 'passport';
import './controllers/signin';

const app = express();
const  { isLoggedIn } = mw.authMiddleware;

app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(session({ secret: auth.SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/auth', routes.authRoutes);

app.get('/', (req, res) => {
  
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(req.user);
});


export default app;