require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes.js');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/', router);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});