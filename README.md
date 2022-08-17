# Storefront-Backend

### Description

This Project Is A Api Store For Create a RESTful Node API with Express, SQL, JWT

### Instructions

Follow These Steps To Start The Project

- run `npm install`
- create .env file at the root directory that contains the following:
  ```
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
  - for more details check config file in utils folder
  ```
- install db-migrate globally by running npm install -g db-migrate
- if you are on windows run [npm run migration:run] to create the database tables
- run db-migrate up to create the database tables
--if you are on mac change the test script in package.json to this export NODE_ENV=test && db-migrate up --env test && tsc && jasmine && db-migrate reset

- run npm run dev to start the development server
## API Endpoints


#### Products
- Index: [token required]: '/products' [GET]
- Show: [token required]:[product id] '/products/:id' [GET]
- Create [token required]: '/products' [POST] request must contains the following:
 ```
  {
        "name": "Your Name Of The Product",
        "price": 500      => Your Price Of The Product
        "category": "Your Category Name"
  }
 ```
#### Users
- Index [token required]: '/users' [GET]
- Show [token required]:[user id] '/users/:id' [GET]
- Create '/register' [POST] request must contains the following:
 ```
  {
        "first_name": "Your User first name",
        "last_name": "Your User Last Name,
        "email": "Your Email"
        "password": "Your User Password"
  }
 ```
- When You Create a New User You will Get a JWT Token in Response

### Authenticate
- Login '/login'
- Login will Create a New JWT Token

#### Orders
- Current Order by user (args: user id)[token required]: 'users/:id/current-order' [GET]

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)




## used scripts

---------------------------
### npm run build
```
To compile typescript files to javascript, in dist folder
```
---------------------------

### npm run remove
```
To remove dist folder
```
---------------------------

### npm run lint
```
To run eslint formatter
```
---------------------------

### npm run format
```
To run prettier formatter
```
---------------------------

### npm run dev
```
To run dev to start the dev server
```
---------------------------

### npm run start
```
To run build to compile files from typescript to javascript and start the server with nodemon in only one script
```
---------------------------

### npm run test
```
To set NODE_ENV to test and run migrations and run jasmine test then reset all the changes again
```
---------------------------