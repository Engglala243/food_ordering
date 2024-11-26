<<<<<<< HEAD
const restaurantSchema = `CREATE TABLE IF NOT EXISTS restaurants (
  restaurant_id int(11) NOT NULL,
  name varchar(255) DEFAULT NULL,
  address varchar(255) DEFAULT NULL,
  uuid varchar(255) NOT NULL,
  email varchar(100) NOT NULL,
  phone int(11) NOT NULL,
  password varchar(255) NOT NULL,
  is_deleted tinyint(1) DEFAULT 0,
  created_by varchar(255) DEFAULT 'admin',
  created_at datetime DEFAULT current_timestamp(),
  modified_by varchar(255) DEFAULT NULL,
  modified_at date DEFAULT NULL
)`;

module.exports = restaurantSchema;
=======
const restaurantSchema = `CREATE TABLE IF NOT EXISTS restaurants (
  restaurant_id int(11) NOT NULL,
  name varchar(255) DEFAULT NULL,
  address varchar(255) DEFAULT NULL,
  uuid varchar(255) NOT NULL,
  email varchar(100) NOT NULL,
  phone int(11) NOT NULL,
  password varchar(255) NOT NULL,
  is_deleted tinyint(1) DEFAULT 0,
  created_by varchar(255) DEFAULT 'admin',
  created_at datetime DEFAULT current_timestamp(),
  modified_by varchar(255) DEFAULT NULL,
  modified_at date DEFAULT NULL
)`;

module.exports = restaurantSchema;
>>>>>>> master
