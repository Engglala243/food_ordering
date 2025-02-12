const { insertRecord, customRecord } = require("../utils/sqlFunctions");
const { customResponse, APIData } = require("../utils/customResponse");

const insertMenu = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req, "<=== this is the menu insert request");
  const name = req.body.name;
  const restaurant_id = req.user.restaurant_id;

  try {
    const query = `SELECT * from menu WHERE name = ? AND restaurant_id = ?`;
    const menuExists = await customRecord(query, [name, restaurant_id]);

    if (menuExists.length != 0) {
      console.log("Menu name exists already!");
      customResponse("Menu name exists already!", 402, false)(req, res);
    } else {
      const query = `INSERT into menu (name, restaurant_id) VALUES (?, ?)`;
      await customRecord(query, [name, restaurant_id]);
      customResponse("Menu name inserted successfully!", 200, true)(req, res);
    }
  } catch (err) {
    console.log(`Menu insert error: ${err}`);
  }
};

const getMenu = async (req, res, next) => {
  const restaurant_id = req.user.restaurant_id;

  try {
    const query = `SELECT * from menu WHERE restaurant_id = ?`;
    const menuData = await customRecord(query, [restaurant_id]);
    console.log(menuData, "<===This is menu data");
    APIData(menuData)(req, res);
  } catch (err) {
    console.log(`Error: ${err}`);
    customResponse(`Error: ${err}`, 402, false)(req, res);
  }
};

module.exports = {
  insertMenu,
  getMenu,
};
