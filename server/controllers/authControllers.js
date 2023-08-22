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
  let hashed_password = null;

  // Check if password is provided (i.e., not using OAuth)
  if (req.body.password) {
    hashed_password = await bcrypt.hash(req.body.password, 10);
  }

  const currentTime = new Date();

  try {
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
        $10
      )
    `, [req.body.first_name, req.body.last_name, req.body.email, req.body.marketing_opted_in, hashed_password, req.body.provider || null, req.body.provider_id || null, req.body.proficiency_level, req.body.dialect, currentTime]);

    const user = await db.oneOrNone('SELECT * FROM Users Where email = $1', [req.body.email]);
    const { id, email, first_name, last_name, dialect, marketing_opted_in, proficiency_level, subscription_tier, subscription_status, subscription_end_date } = user;
    const sanitizedUser = { id, email, first_name, last_name, dialect, marketing_opted_in, proficiency_level, subscription_tier, subscription_status, subscription_end_date };

    req.session.user = sanitizedUser;
    res.status(200).json({ user: sanitizedUser });

  } catch (err) {
    if (err.code === '23505') { // unique_violation in PostgreSQL
      res.status(409).json({ message: 'Email already exists.' }); // 409 conflict error
    } else {
      console.error('signup error:', err);
      res.status(500).json({ message: 'Server error, sign up failed.' });
    }
  }
};


exports.login = async (req, res) => {
  const { email: inputEmail, password } = req.body;

  try {
    const user = await db.oneOrNone('SELECT * FROM Users WHERE email = $1', [inputEmail]);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.hashed_password);
    if (!passwordMatches) {
      return res.status(403).json({ message: 'Incorrect password.' });
    }

    const { id, email, first_name, last_name, dialect, marketing_opted_in, proficiency_level, subscription_tier, subscription_status, subscription_end_date } = user;
    const sanitizedUser = { id, email, first_name, last_name, dialect, marketing_opted_in, proficiency_level, subscription_tier, subscription_status, subscription_end_date };

    req.session.user = sanitizedUser;
    res.status(200).json({ user: sanitizedUser });

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