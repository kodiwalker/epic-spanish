const axios = require('axios');
require('dotenv').config();
const { OpenAI } = require('openai');
const prompts = require('./prompts');
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate();

const openai = new OpenAI();

exports.getStories = (req, res) => {
  console.log('getStories reached:', req.params.userid)
};

exports.getStory = (req, res) => {
  console.log('getStory reached:', req.params.storyid)
  //TODO - Add middleware to verify session user id against story user id, if not send 403
  const story = {
    "title": "Un Amor en la Cafetería",
    "words": [
      "Sara",
      "es",
      "una",
      "chica",
      "joven",
      "y",
      "bonita.",
      "Todos",
      "los",
      "días,",
      "va",
      "a",
      "su",
      "cafetería",
      "favorita.",
      "Es",
      "un",
      "lugar",
      "tranquilo",
      "y",
      "acogedor,",
      "con",
      "mesas",
      "de",
      "madera",
      "y",
      "sillas",
      "cómodas.",
      "Sara",
      "siempre",
      "pide",
      "un",
      "café",
      "con",
      "leche",
      "y",
      "una",
      "tostada",
      "con",
      "mermelada.",
      "Mientras",
      "bebe",
      "su",
      "café,",
      "mira",
      "por",
      "la",
      "ventana",
      "y",
      "observa",
      "a",
      "las",
      "personas",
      "pasar.",
      "Un",
      "día,",
      "mientras",
      "estaba",
      "disfrutando",
      "de",
      "su",
      "café,",
      "un",
      "chico",
      "guapo",
      "entró",
      "en",
      "la",
      "cafetería.",
      "Tenía",
      "el",
      "pelo",
      "oscuro",
      "y",
      "los",
      "ojos",
      "verdes",
      "cálidos.",
      "Se",
      "sentó",
      "en",
      "la",
      "mesa",
      "de",
      "al",
      "lado",
      "y",
      "pidió",
      "un",
      "capuchino.",
      "Sara",
      "no",
      "pudo",
      "apartar",
      "la",
      "mirada",
      "de",
      "él",
      "y,",
      "sin",
      "darse",
      "cuenta,",
      "se",
      "sonrojó.",
      "Decidió",
      "acercarse",
      "y",
      "entablar",
      "una",
      "conversación.",
      "\"Hola,",
      "¿cómo",
      "te",
      "llamas?\"",
      "preguntó",
      "ella",
      "tímidamente.",
      "Él",
      "sonrió",
      "y",
      "respondió:",
      "\"Soy",
      "Carlos\".",
      "Y",
      "así",
      "comenzó",
      "una",
      "amistad",
      "entrañable.",
      "Cada",
      "día,",
      "Carlos",
      "esperaba",
      "a",
      "Sara",
      "en",
      "la",
      "misma",
      "cafetería.",
      "Charlaban",
      "sobre",
      "sus",
      "vidas",
      "y",
      "compartían",
      "risas.",
      "Poco",
      "a",
      "poco,",
      "esa",
      "amistad",
      "se",
      "convirtió",
      "en",
      "amor.",
      "Ahora,",
      "Sara",
      "y",
      "Carlos",
      "son",
      "inseparables.",
      "Comparten",
      "momentos",
      "especiales",
      "en",
      "su",
      "cafetería",
      "favorita,",
      "donde",
      "su",
      "historia",
      "de",
      "amor",
      "comenzó."
    ]
  }
  res.json({ title: story.title, words: story.words })
};

exports.createStory = (req, res) => {
  //TODO res should include storyID (so ReaderPage can request it)
  console.log('createStory reached:', req.body)

  async function main() {
    const completion = await openai.chat.completions.create({
      messages: prompts.superbeginner,
      model: "gpt-3.5-turbo",
    });

    let gptOutput = completion.choices[0].message.content
    let titleMatch = gptOutput.match(/^([^\n]+)/);
    let title = titleMatch ? titleMatch[0] : "";
    gptOutput = gptOutput.replace(title, '').trim();
    gptOutput = gptOutput.replace(/\s*Fin\s*$/, '').trim();
    let words = gptOutput.split(/\s+/).map(word => word.replace(/\n\n/g, ' ').trim()).filter(Boolean);

    res.json({ title, words, gptOutput })
  }

  main();
};

exports.translateWord = async (req, res) => {
  const cleanWord = req.params.word.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');

  try {
    console.log(`Translating '${cleanWord}'`)
    const [translation] = await translate.translate(cleanWord, 'en');
    res.json({ translated: translation });
  } catch (e) {
    console.error('Failed to translate:', e);
    res.status(500).json({ error: 'Translate failed...' });
  }
};
