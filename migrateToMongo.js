// migrateToMongo.js
require('dotenv').config();
const { Client } = require('pg');
const { MongoClient } = require('mongodb');

const pgClient = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const mongoClient = new MongoClient(process.env.MONGO_URI);

(async () => {
  try {
    await pgClient.connect();
    await mongoClient.connect();
    const db = mongoClient.db(process.env.MONGO_DB); // It's a new MongoDB database name, used to store the migrated data. Uses the database name from the .env file

    console.log('Connected to PostgreSQL and MongoDB');

    // Migrate language
    const languages = await pgClient.query('SELECT * FROM language');
    await db.collection('languages').insertMany(languages.rows);
    console.log('Language table migrated to MongoDB');

    // Migrate category
    const categories = await pgClient.query('SELECT * FROM category');
    await db.collection('categories').insertMany(categories.rows);
    console.log('Category table migrated to MongoDB');

    // Migrate actor
    const actors = await pgClient.query('SELECT * FROM actor');
    await db.collection('actors').insertMany(actors.rows);
    console.log('Actor table migrated to MongoDB');

    // Migrate film
    const films = await pgClient.query('SELECT * FROM film');
    await db.collection('films').insertMany(films.rows);
    console.log('Film table migrated to MongoDB');

    await pgClient.end();
    await mongoClient.close();
    console.log('Migration to MongoDB complete');
  } catch (err) {
    console.error('Migration to MongoDB failed:', err);
  }
})();