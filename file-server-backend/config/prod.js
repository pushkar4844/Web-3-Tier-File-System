const config = {
  "host": process.env.DB_HOST,
  "port": parseInt(process.env.DB_PORT),
  "password": process.env.DB_PASSWORD,
  "user": process.env.DB_USER,
  "database": process.env.DB_NAME
}

module.exports = { config };
