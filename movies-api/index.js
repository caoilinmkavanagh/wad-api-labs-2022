import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies/index.js';
import genresRouter from './api/genres/index.js';
import usersRouter from './api/users/index.js';
import cors from 'cors';
import './db/index.js';
import './seedData/index.js';
//import session from 'express-session';
// replace existing authenticate import with passport strategy
import passport from './authenticate/index.js';


dotenv.config();

const errHandler = (err, req, res) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};



const app = express();
//const cors = require('cors');
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
/* app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
})); */
//app.use('/api/movies', authenticate, moviesRouter);
//app.use('/api/movies', moviesRouter);
app.use('/api/genres', genresRouter);
// Add passport.authenticate to middleware stack for protected routes
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/users', usersRouter);
app.use(errHandler);
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});