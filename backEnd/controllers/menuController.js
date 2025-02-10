const { insertRecord, customRecord } = require("../utils/sqlFunctions");
const { customResponse } = require("../utils/customResponse");

const insertMenu = async (req, res, next) => {
  const name = req.body.name;
  const restaurant_id = req.user.restaurant_id;

  try {
    const query = `SELECT * from menu WHERE restaurant_id = ? AND name = ?`;
    const existingMenu = await customRecord(query, [restaurant_id, name]);

    if (existingMenu) {
      customResponse("Menu already exists", 409, false)(req, res);
    } else {
      const query = `INSERT INTO menu (name) VALUES (?) WHERE restaurant_id = ?`;
      await customRecord(query, [name, restaurant_id]);
    }
  } catch (err) {
    console.log(`Menu Insert Error: ${err}`);
  }
};
