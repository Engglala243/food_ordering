const itemSchema = `CREATE TABLE IF NOT EXISTS items (
  id int NOT NULL,
  name varchar(100) NOT NULL,
  description varchar(255) NOT NULL,
  images_path text NOT NULL,
  category_id int NOT NULL,
  ticket_price int NOT NULL,
  quantity int NOT NULL,
  in_stock int NOT NULL,
  max_entries int NOT NULL,
  min_entries int NOT NULL,
  start_date timestamp NOT NULL,
  end_date timestamp NOT NULL,
  created_at timestamp NOT NULL,
  created_by int NOT NULL,
  updated_at timestamp NOT NULL,
  updated_by int NOT NULL,
  is_active tinyint(1) NOT NULL,
  is_deleted tinyint(1) NOT NULL
) `;

module.exports = itemSchema;
