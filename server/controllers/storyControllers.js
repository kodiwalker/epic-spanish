const axios = require('axios');
require('dotenv').config();

exports.getStories = (req, res) => {
  console.log('getStories reached:', req.params.userid)
};

exports.createStory = (req, res) => {
  console.log('createStory reached:', req.body)
};

