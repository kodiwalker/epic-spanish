const axios = require('axios');
require('dotenv').config();
const { db } = require('../db');
const { OpenAI } = require('openai');
const prompts = require('./prompts');
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate();
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
const polly = new AWS.Polly({ apiVersion: '2016-06-10' });
const openai = new OpenAI();

exports.getStories = async (req, res) => {
  const userId = req.session.user.id;

  try {
    const storiesQuery = `
      SELECT * FROM stories WHERE user_id = $1;
    `;

    const stories = await db.any(storiesQuery, [userId]);

    res.json(stories);

  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).send("Error retrieving stories.");
  }
};


exports.getStory = async (req, res) => {
  const storyId = req.params.storyid;
  try {
    const storyQuery = `
      SELECT * FROM stories WHERE id = $1;
    `;

    const story = await db.oneOrNone(storyQuery, [storyId]);

    if (!story) {
      return res.status(404).send("Story not found.");
    }

    if (req.session.user.id !== story.user_id) {
      return res.status(403).send("Forbidden: You do not have access to this story.");
    }

    res.json(story);

  } catch (error) {
    console.error("Error fetching story:", error);
    res.status(500).send("Error retrieving story.");
  }
};


exports.createStory = async (req, res) => {
  const readTime = req.body.readTime;
  const genres = req.body.genres;
  const completion = await openai.chat.completions.create({
    messages: prompts.beginner(req.session.user.dialect, readTime, genres.join(',')),
    model: "gpt-3.5-turbo",
  });

  const checkPollyTaskStatus = async (taskId) => {
    const params = {
      TaskId: taskId
    };

    while (true) {
      const statusResponse = await polly.getSpeechSynthesisTask(params).promise();
      if (statusResponse.SynthesisTask.TaskStatus === 'completed') {
        return statusResponse.SynthesisTask.OutputUri;
      } else if (statusResponse.SynthesisTask.TaskStatus === 'failed') {
        throw new Error('Polly synthesis task failed');
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  let gptOutput = completion.choices[0].message.content;
  let titleMatch = gptOutput.match(/^([^\n]+)/);
  let title = titleMatch ? titleMatch[0] : "";
  gptOutput = gptOutput.replace(title, '').trim();
  gptOutput = gptOutput.replace(/\s*Fin\s*$/, '').trim();
  let words = gptOutput.split(/\s+/).map(word => word.replace(/\n\n/g, ' ').trim()).filter(Boolean);

  const textToConvert = `<speak>${title} <break time="1.5s"/> ${words.join(' ')}</speak>`;

  const params = {
    OutputFormat: 'mp3',
    SampleRate: '22050',
    Text: textToConvert,
    TextType: 'ssml',
    VoiceId: 'Penelope',
    OutputS3BucketName: 'open-libro-testing',
  };

  try {
    const pollyResponse = await polly.startSpeechSynthesisTask(params).promise();
    const audioUrl = await checkPollyTaskStatus(pollyResponse.SynthesisTask.TaskId);

    const userId = req.session.user.id;
    const proficiencyLevel = req.session.user.proficiency_level;

    const insertQuery = `
        INSERT INTO stories (user_id, created_at, title, text, proficiency_level, mp3_url, voice_name, word_count, read_time)
        VALUES ($1, NOW(), $2, $3, $4, $5, $6, $7, $8)
        RETURNING id;
    `;

    const result = await db.one(insertQuery, [userId, title, words, proficiencyLevel, audioUrl, 'Penelope', words.length, readTime]);

    res.json(result.id);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error generating audio story.");
  }
};

exports.translateWord = async (req, res) => {
  const cleanWord = req.params.word.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');

  try {
    const options = { from: 'es', to: 'en', format: 'text' }
    const [translation] = await translate.translate(cleanWord, options);

    console.log(`Translated '${cleanWord}' to '${translation}'`);

    res.json({ translated: translation });
  } catch (e) {
    console.error('Failed to translate:', e);
    res.status(500).json({ error: 'Translate failed...' });
  }
};
