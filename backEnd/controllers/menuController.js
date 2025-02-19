const { customRecord } = require("../utils/sqlFunctions");
const { customResponse, APIData } = require("../utils/customResponse");

const insertMenu = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  const menu_names = req.body.menu_names;
  const restaurant_id = req.user.restaurant_id;
  console.log(restaurant_id, "<===restaurant id");

  const menuExists = await Promise.all(
    menu_names.map(async (menu) => {
      const query = `SELECT * from menu WHERE name = ? AND restaurant_id = ?`;
      const result = await customRecord(query, [menu.name, restaurant_id]);
      return result.length !== 0 ? `Name "${menu.name}" exists already!` : null;
    }),
  );

  const menuNames = menuExists.filter((msg) => msg !== null);

  if (menuNames.length != 0) {
    console.log("Menu name exists already!");
    customResponse(menuNames, 500, false)(req, res);
  } else {
    menu_names.map(async (menu, inx) => {
      try {
        const query = `INSERT into menu (name, restaurant_id) VALUES (?, ?)`;
        await customRecord(query, [menu.name, restaurant_id]);
        customResponse("Menu name inserted successfully!", 200, true)(req, res);
      } catch (err) {
        console.log(`Menu insert error: ${err}`);
      }
    });
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
