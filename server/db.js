const pgp = require('pg-promise')();


exports.db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'epicspanish',
  user: 'kode',
});