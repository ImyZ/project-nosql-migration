# Sakila NoSQL Migration

This project migrates selected tables from the **Sakila** relational database (PostgreSQL) to **NoSQL databases**: Redis (key-value) and MongoDB (document store).

---

## Project Structure

sakila-nosql-migration/
├── migrateToRedis.js # Migrates Country and City tables to Redis
├── migrateToMongo.js # Migrates Film, Actor, Category, Language tables to MongoDB
├── .env.example # Sample environment file example
├── .gitignore # Ignore .env and node_modules
├── package.json # Project metadata and dependencies
└── README.md # Project documentation

## Requirements

- Node.js v18+ 
- PostgreSQL (with Sakila schema and data loaded)  
- Redis and MongoDB:
  - via Docker **(recommended)**  
  - or local installations

## Setup

1. **Clone this repository:**
   ```bash
   git clone https://github.com/ImyZ/project-nosql-migration.git
   cd project-nosql-migration

2. **To quickly generate a default package.json file, run the following command:**
    <!-- It initializes a new Node.js project. -->
   ```bash
   npm init -y

3. **Install dependencies: (To create the node_modules folder)**
   ```bash
   npm install pg mongodb redis dotenv

4. **Create a .env file based on .env.example: (Note: Fill in your database credentials)**
   ```bash
   cp .env.example .env

5. **Start Redis and MongoDB with Docker (if needed)**
   1. **Install Docker Desktop (if not already installed)**
   2. **Start Redis (in you Docker terminal):**
        ```bash
        docker run -d --name redis -p 6379:6379 redis
   3. **Start MongoDB (in you Docker terminal):**
        ```bash
        docker run -d --name mongodb -p 27017:27017 mongo
   4. **Run the migration scripts (in you project terminal):**

       **Migrate to Redis**
            ```bash
            node migrateToRedis.js
        <!--It means:
        Run the file migrateToRedis.js using the Node.js runtime.
        It will connect to PostgreSQL, fetch the country and city data, and insert them into Redis. -->

      **Migrate to MongoDB**
            ```bash
            node migrateToMongo.js
    <!-- It means:
    Connect to PostgreSQL, fetch data from film, actor, category, language tables, and insert them into MongoDB. -->
    5. **Note: To verify the data was actually inserted into Redis and MongoDB:**

        **For Redis**
        1. **Open a Redis CLI (If you're using Docker, run this in the terminal):**
                ```bash
                docker exec -it redis redis-cli
        2. **List Redis keys, once inside Redis CLI, run:**
                ```bash
                KEYS *
        <!-- You should see the keys. -->
        3. **You can check a specific country:**
                ```bash
                GET country:1
        <!-- If you used JSON string format, you’ll get the JSON format for the country:1 data. -->

        **For MongoDB**
        1. **Open a Mongodb CLI and run:**
                ```bash
                docker exec -it mongodb mongosh
        2. **Once inside, run:**
                ```bash
                use sakila_nosql
                show collections
        3. **You should see collections like:**
                actors
                categories
                films
                languages
        4. **You can also count them running:**
                ```bash
                db.films.countDocuments()