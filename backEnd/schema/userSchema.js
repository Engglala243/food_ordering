<<<<<<< HEAD
<<<<<<< HEAD
const userSchema = `CREATE TABLE IF NOT EXISTS users (
  id int NOT NULL,
  uuid varchar(255) NOT NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(255) NOT NULL,
  avatar_path varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  is_admin tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(100) NOT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  updated_by varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  is_active tinyint(1) NOT NULL DEFAULT '1',
  is_deleted tinyint(1) NOT NULL DEFAULT '0'
);
`;

module.exports = userSchema;
=======
const userSchema = `CREATE TABLE IF NOT EXISTS users (
  id int NOT NULL,
  uuid varchar(255) NOT NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
=======
const userSchema = `CREATE TABLE IF NOT EXISTS users (
  id int NOT NULL,
  uuid varchar(255) NOT NULL,
  name varchar(100) NOT NULL,
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
  email varchar(100) NOT NULL,
  password varchar(255) NOT NULL,
  avatar_path varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  is_admin tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(100) NOT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  updated_by varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  is_active tinyint(1) NOT NULL DEFAULT '1',
  is_deleted tinyint(1) NOT NULL DEFAULT '0'
);
`;

module.exports = userSchema;
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
