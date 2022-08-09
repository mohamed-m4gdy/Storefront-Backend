CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE product(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price integer NOT NULL
);