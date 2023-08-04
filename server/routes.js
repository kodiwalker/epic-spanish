const express = require('express');
const router = express.Router();
const { signup, login } = require('./controllers/authControllers');
const { getStories, createStory } = require('./controllers/storyControllers');


router.post('/login', login);
router.post('/signup', signup);

router.get('/stories/:userid', getStories)
router.post('/stories/new', createStory)

module.exports = router;