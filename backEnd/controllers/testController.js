const { customRecord } = require("../utils/sqlFunctions");
const { customResponse, APIData } = require("../utils/customResponse");

const getMenuData = async (req, res, next) => {
  const query = `SELECT name from menu WHERE restaurant_id = ?`;
  console.log(req.params, "<===this is params");
  const restaurant_id = req.params.restaurant_id;

  const result = await customRecord(query, [restaurant_id]);

  console.log(result, "<===this is result");

  APIData(result)(req, res);
};

module.exports = {
  getMenuData,
};
