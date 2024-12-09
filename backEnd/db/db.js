const mysql = require("mysql2");
const config = require("./config");

const connectDB = async () => {
  const pool = mysql.createPool({
    ...config,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0, 
  });

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection error:", err.message);
      return;
    }

    console.log("Connected to MySQL database");
    connection.release(); 
  });
};

module.exports = connectDB;
