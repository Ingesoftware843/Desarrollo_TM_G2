const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

async function query(sqlQuery, params = {}) {
  await poolConnect;
  const request = pool.request();

  for (const [key, value] of Object.entries(params)) {
    request.input(key, value);
  }

  return await request.query(sqlQuery);
}

module.exports = { query };
