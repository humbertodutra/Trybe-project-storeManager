const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: Number(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  });

module.exports = connection;