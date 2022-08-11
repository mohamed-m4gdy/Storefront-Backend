npx db-migrate create users-table --sql-file
npx db-migrate create product-table --sql-file
npx db-migrate create orders-table --sql-file

db-migrate up
db-migrate down
db-migrate reset