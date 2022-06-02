module.exports = {
  "type": "mysql",
  "host": process.env.NODE_ENV === "prod" ? process.env.DB_HOST : "localhost",
  "port": process.env.NODE_ENV === "prod" ? process.env.DB_PORT : 3306,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": "study-auth",
  "synchronize": true,
  "logging": true,
  "entities": ["dist/**/*/entities/*.entity{.ts,.js}"]
}
