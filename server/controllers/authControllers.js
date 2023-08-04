const axios = require('axios');
require('dotenv').config();

exports.signup = (req, res) => {
  console.log('signup reached:', req.body)
};

exports.login = (req, res) => {
  console.log('login reached:', req.body);
};