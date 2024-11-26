<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
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

<<<<<<< HEAD
module.exports = config;
>>>>>>> master
=======
module.exports = config;
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
