# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index '/products' [GET]
- Show '/products/:id' [GET]
- Create [token required]: '/products' [POST]

#### Users
- Index [token required]: '/users' [GET]
- Show [token required]: '/users/:id' [GET]
- Create '/register' [POST]

### Authenticate
- Login '/login' [POST]

#### Orders
- Current Order by user (args: user id)[token required]: 'users/:id/current-order' [GET]
- create order [token required]: '/users' [POST]
 ```
  {
    "status": "open",
    "user_id": 1
  }
 ```
- Create Order Product [token required]: '/users/:id/products' [get]
 ```
  {
    "order_id": 1,
    "product_id": 1,
    "quantity": 5
  }
 ```

## Data Shapes
#### product
- id serial primary key,
- name varchar
- price integer
- category varchar

#### user
- id serial primary key
- firstName varchar
- lastName varchar
- password varchar
- email varchar
#### orders
- id serial primary key
- status varchar
- user_id references user(id)

### order_products
- order_id references orders(id)
- product_id references products(id)
- quantit integer