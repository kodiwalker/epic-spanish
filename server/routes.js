const express = require('express');
const router = express.Router();
const { signup, login, authCheck, logout } = require('./controllers/authControllers');
const { getStories, createStory, getStory, translateWord } = require('./controllers/storyControllers');


router.post('/login', login);
router.post('/logout', logout);
router.post('/signup', signup);
router.get('/authcheck', authCheck);

router.get('/stories', getStories)
router.get('/story/:storyid', getStory)
router.post('/stories/new', createStory)
router.get('/translate/:word', translateWord)

module.exports = router;