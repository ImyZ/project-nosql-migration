// migrateToRedis.js
require('dotenv').config();
const { Client } = require('pg');
const redis = require('redis');

const pgClient = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

(async () => {
  try {
    await pgClient.connect();
    await redisClient.connect();

    console.log('Connected to PostgreSQL and Redis');

    // Migrate country
    const countries = await pgClient.query('SELECT * FROM country');
    for (const country of countries.rows) {
      const key = `country:${country.country_id}`;
      await redisClient.set(key, JSON.stringify(country));
    }
    console.log('Country table migrated to Redis');

    // Migrate city
    const cities = await pgClient.query('SELECT * FROM city');
    for (const city of cities.rows) {
      const key = `city:${city.city_id}`;
      await redisClient.set(key, JSON.stringify(city));
    }
    console.log('City table migrated to Redis');

    await pgClient.end();
    await redisClient.quit();
    console.log('Migration to Redis complete');
  } catch (err) {
    console.error('Migration to Redis failed:', err);
  }
})();