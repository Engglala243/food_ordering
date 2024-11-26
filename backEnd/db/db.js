<<<<<<< HEAD
<<<<<<< HEAD
const mysql = require("mysql2");
const config = require("./config");

const connectDB = async () => {
  const pool = mysql.createPool(config);

  pool.getConnection((err, connection) => {
    if (err) {
      console.log({ error: err.message });
    }

    console.log("Connected to MySQL database");
    connection.release();
  });
};

module.exports = connectDB;
=======
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
const mysql = require("mysql2");
const config = require("./config");

const connectDB = async () => {
  const pool = mysql.createPool(config);

  pool.getConnection((err, connection) => {
    if (err) {
      console.log({ error: err.message });
    }

    console.log("Connected to MySQL database");
    connection.release();
  });
};

<<<<<<< HEAD
module.exports = connectDB;
>>>>>>> master
=======
module.exports = connectDB;
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
