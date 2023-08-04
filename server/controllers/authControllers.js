const axios = require('axios');
const bcrypt = require('bcrypt');
const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'epicspanish',
  user: 'kode',
});


exports.signup = async (req, res) => {
  const { first_name, last_name, email, password = null, provider = null, provider_id = null, marketing_opted_in, proficiency_level, dialect, genre1, genre2, genre3 } = req.body;
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
    // First, retrieve the user from the database
    const user = await db.oneOrNone('SELECT * FROM Users WHERE email = $1', [email]);

    // If the user is not found, send an error message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user is found, check if the passwords match
    const passwordMatches = await bcrypt.compare(password, user.hashed_password);

    // If they don't match, send an error message
    if (!passwordMatches) {
      return res.status(403).json({ message: 'Incorrect password' });
    }

    // If the passwords do match, send a success message (and possibly a session token)
    res.status(200).json({ message: 'Logged in successfully' });

  } catch (err) {
    // If something else goes wrong, log the error and send an error message
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};
