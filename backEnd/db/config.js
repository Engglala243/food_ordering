const config = {
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
  ssl: {
    rejectUnauthorized: true,
    ca: `${process.env.DBSSL}`,
  },
};

module.exports = config;