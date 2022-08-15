CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(64) NOT NULL,
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);