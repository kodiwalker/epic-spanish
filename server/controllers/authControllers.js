const axios = require('axios');
const bcrypt = require('bcrypt');
const { db } = require('../db');
require('dotenv').config();


exports.authCheck = async (req, res) => {
  if (req.session && req.session.user && req.session.user.id) {
    const user = await db.oneOrNone('SELECT * FROM Users WHERE id = $1', [req.session.user.id]);
    res.status(200).json({ isAuthenticated: true, user });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
};

exports.signup = async (req, res) => {
  const { first_name, last_name, email, password = null, provider = null, provider_id = null, marketing_opted_in, proficiency_level, dialect, genre1, genre2 = null, genre3 = null } = req.body;
  let hashed_password;

  try {
    if (password !== null) {
      hashed_password = await bcrypt.hash(password, 10);
    } else {
      hashed_password = null;
    }

    const currentTime = new Date();

    await db.none(`
      INSERT INTO Users (
        first_name, 
        last_name, 
        email, 
        marketing_opted_in, 
        hashed_password, 
        provider, 
        provider_id, 
        proficiency_level, 
        dialect, 
        genre1, 
        genre2, 
        genre3, 
        created_at, 
        updated_at
      ) VALUES (
        $1, 
        $2, 
        $3, 
        $4, 
        $5, 
        $6, 
        $7, 
        $8, 
        $9, 
        $10, 
        $11, 
        $12,
        $13, 
        $13
      )
    `, [first_name, last_name, email, marketing_opted_in, hashed_password, provider, provider_id, proficiency_level, dialect, genre1, genre2, genre3, currentTime]);

    res.session.user = await db.oneOrNone('SELECT * FROM Users Where email = $1', [email]);
    res.status(200).send('signup succeeded');

  } catch (err) {
    if (err.code === '23505') { // unique_violation in PostgreSQL
      res.status(409).json({ message: 'Email already exists' }); // 409 conflict error
    } else {
      console.error('signup error:', err);
      res.status(500).json({ message: 'Signup failed' });
    }
  }

};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.oneOrNone('SELECT * FROM Users WHERE email = $1', [email]);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.hashed_password);
    if (!passwordMatches) {
      return res.status(403).json({ message: 'Incorrect password.' });
    }

    // If the passwords do match, send a success message (and possibly a session token)
    req.session.user = user;
    res.status(200).json({ user });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }

    res.status(200).json({ message: 'Logged out successfully' });
  });
}