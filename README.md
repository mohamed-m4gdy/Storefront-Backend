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

{
        "quantity": 15,
        "status": "active",
        "user_id": "541f85bc-4e4f-4b53-bd41-49e4aa683a59",
        "product_id": "05d1336a-38cd-4cd6-a11b-c94ccd5b6c9d"
}

#### Products
- Index: [token required]: '/api/products' [GET]
- Show: [token required]:[product id] '/api/products/:id' [GET]
- Create [token required]: '/api/products' [POST] request must contains the following:
 ```
  {
        "name": "Your Name Of The Product",
        "price": 500      => Your Price Of The Product
  }
 ```
- Update [token required]:[product id] '/api/products/id' [patch] request must contains the following:
 ```
  {
        "name": "Your New Product Name",
        "price": 500      => Your New Product Price
  }
 ```
- delete [token required]:[product id] '/api/products/id' [delete]

#### Users
- Index [token required]: '/api/users' [GET]
- Show [token required]:[user id] '/api/users/:id' [GET]
- Create '/api/users/register' [POST] request must contains the following:
 ```
  {
        "first_name": "Your User first name",
        "last_name": "Your User Last Name,
        "password": "Your User Password"
  }
 ```
- When You Create a New User You will Get a JWT Token in Response

- Update [token required]:[user id] '/api/users/id' [patch] request must contains the following:
 ```
  {
        "first_name": "Your New first name",
        "last_name": "Your New Last Name,
        "password": "Your New Password"
  }
 ```
- delete [token required]:[user id] '/api/users/id' [delete]

### Authenticate
- Login '/api/users/login'
- Login will Create a New JWT Token

#### Orders
- Add Product To user Orders (args: user id)[token required]: '/api/orders/' [POST] request must contains the following:
 ```
  {
        "quantity": "Your quantity",
        "status": "Your Status",
        "user_id": "Your User Id"
        "product_id": "Product id"
  }
- Current Order by user (args: user id)[token required]: '/api/orders/:id' [GET]
- will return all the products for this user_id

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- quantity of each product in the order
- status of order (active or complete)
- user_id
- product_id



## used scripts

-------------------------------------------------------------------------------------------------------------------------------------------------

### npm run build
```
To compile typescript files to javascript, in dist folder
```
-------------------------------------------------------------------------------------------------------------------------------------------------

### npm run remove
```
To remove dist folder
```
-------------------------------------------------------------------------------------------------------------------------------------------------

### npm run lint
```
To run eslint formatter
```
-------------------------------------------------------------------------------------------------------------------------------------------------

### npm run format
```
To run prettier formatter
```
-------------------------------------------------------------------------------------------------------------------------------------------------

### npm run dev
```
To run dev to start the dev server
```
-------------------------------------------------------------------------------------------------------------------------------------------------

### npm run start
```
To run build to compile files from typescript to javascript and start the server with nodemon in only one script
```
-------------------------------------------------------------------------------------------------------------------------------------------------

### npm run test
```
To set NODE_ENV to test and run migrations and run jasmine test then reset all the changes again
```
-------------------------------------------------------------------------------------------------------------------------------------------------