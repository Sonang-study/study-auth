module.exports = {
  "type": "mysql",
  "host": process.env === "prod" ? process.env.DB_HOST : "localhost",
  "port": process.env === "prod" ? process.env.DB_PORT : 3306,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": "study-auth",
  "synchronize": true,
  "logging": process.env.NODE_ENV === 'prod' ? false : true,
  "entities": ["dist/**/*/entities/*.entity{.ts,.js}"]
}
