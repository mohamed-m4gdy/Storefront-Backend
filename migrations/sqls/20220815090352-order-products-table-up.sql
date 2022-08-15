CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_products(
  order_id uuid DEFAULT uuid_generate_v4() NOT NULL,
  product_id uuid DEFAULT uuid_generate_v4() NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES product(id),
  quantity INT
);