# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index: [token required]: '/api/products' [GET]
- Show: [token required]: '/api/products/:id' [GET]
- Create [token required]: '/api/products' [POST]
- Update [token required]: '/api/products/id' [patch]
- delete [token required]: '/api/products/id' [delete]

#### Users
- Index [token required]: '/api/users' [GET]
- Show [token required]: '/api/users/:id' [GET]
- Create '/api/users/register' [POST]
- Update [token required]: '/api/users/id' [patch]
- delete [token required]: '/api/users/id' [delete]

### Authenticate
- Login '/api/users/login'

#### Orders
- Add Product To user Orders (args: user id)[token required]: '/api/orders/' [POST]
- Current Order by user (args: user id)[token required]: '/api/orders/:id' [GET]

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