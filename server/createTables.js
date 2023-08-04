const pgp = require('pg-promise')();

// Connection parameters
const connection = {
  host: 'localhost',
  port: 5432,
  database: 'epicspanish',
  user: 'kode',
};

const db = pgp(connection);

const createTables = async () => {
  await db.none(`CREATE TABLE Users (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP,
        updated_at TIMESTAMP,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(50),
        marketing_opted_in BOOLEAN,
        hashed_password VARCHAR(255),
        provider VARCHAR(50),
        provider_id VARCHAR(50),
        proficiency_level VARCHAR(50),
        dialect VARCHAR(50),
        genre1 VARCHAR(50),
        genre2 VARCHAR(50),
        genre3 VARCHAR(50),
        subscription_tier VARCHAR(50),
        subscription_status VARCHAR(50),
        subscription_end_date TIMESTAMP
    )`);

  await db.none(`CREATE TABLE Stories (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(id),
        created_at TIMESTAMP,
        title VARCHAR(100),
        text TEXT[],
        proficiency_level VARCHAR(50),
        read_time INT,
        genre1 VARCHAR(50),
        genre2 VARCHAR(50),
        genre3 VARCHAR(50),
        sequel_to_story_id INT,
        prequel_to_story_id INT,
        character_count INT,
        word_count INT,
        bookmark_index INT,
        mp3_url TEXT,
        voice_name VARCHAR(50)
    )`);

  await db.none(`CREATE TABLE SavedStories (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(id),
        story_id INT REFERENCES Stories(id)
    )`);
};

createTables()
  .then(() => {
    console.log('Tables created successfully!');
    pgp.end();
  })
  .catch((error) => {
    console.error('Error creating tables', error);
    pgp.end();
  });
