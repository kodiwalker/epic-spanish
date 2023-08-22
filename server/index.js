require('dotenv').config();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const express = require('express');
const morgan = require('morgan');
const router = require('./routes.js');
const cors = require('cors');
const path = require('path');
const app = express();
const { db } = require('./db.js');


app.use(session({
  store: new pgSession({
    pgPromise: db // Use your existing pg-promise instance
  }),
  secret: process.env.SESSION_SECRET, // Secret used to sign the session ID cookie. Store this in your .env file.
  resave: false,
  saveUninitialized: false, // Don't create a session until something is stored
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV === 'production', // Only send the cookie over https if in production
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
  }
}));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
