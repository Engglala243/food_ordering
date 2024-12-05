const cartSchema = `
CREATE TABLE IF NOT EXISTS cart (
  id int NOT NULL,
  user_id int NOT NULL,
  dish_id int NOT NULL,
  quantity int NOT NULL
)
`;

module.exports = {
  cartSchema,
};
