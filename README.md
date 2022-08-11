# Storefront-Backend

### Description

This Project Is A Api Store For Create a RESTful Node API with Express, SQL, JWT

### Instructions

Follow These Steps To Start The Project

- run `npm install`
- create .env file at the root directory that contains the following:
  ```
  PORT=app port = 3000

  NODE_ENV=dev
  POSTGRES_HOST=your postgresql host
  POSTGRES_PORT=your postgresql port
  POSTGRES_DB=your postgresql database name
  POSTGRES_DB_TEST=your postgresql test database name
  POSTGRES_USER=your postgresql user
  POSTGRES_PASSWORD=your postgresql password
  BCRYPT_PASSWORD=Your bcrtypt security password
  SALT_ROUNDS=10
  TOKEN_SECRET=your jwt secret
  ```
- create a database.json file at the root directory that contains the following:
  ```
  {
    "defaultEnv": { "ENV": "NODE_ENV" },
    "dev": {
      "driver": "pg",
      "host": { "ENV": "POSTGRES_HOST" },
      "port": { "ENV": "POSTGRES_PORT" },
      "database": { "ENV": "POSTGRES_DB" },
      "user": { "ENV": "POSTGRES_USER" },
      "password": { "ENV": "POSTGRES_PASSWORD" }
    },
    "test": {
      "driver": "pg",
      "host": { "ENV": "POSTGRES_HOST" },
      "port": { "ENV": "POSTGRES_PORT" },
      "database": { "ENV": "POSTGRES_DB_TEST" },
      "user": { "ENV": "POSTGRES_USER" },
      "password": { "ENV": "POSTGRES_PASSWORD" }
    }
  }
  ```
- install db-migrate globally by running npm install -g db-migrate
- if you are on windows run [npm run migration:run] to create the database tables
- run db-migrate up to create the database tables
--if you are on mac change the test script in package.json to this export NODE_ENV=test && db-migrate up --env test && tsc && jasmine && db-migrate reset

- run npm run dev to start the development server

### Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing