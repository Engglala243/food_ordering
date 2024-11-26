const {
  customRecord,
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunctions");
const { APIData, customResponse } = require("../utils/customResponse");
const { APIError, AppError } = require("../utils/customErrors");
const { uploadFile } = require("../middlewares/fileUpload");
const itemSchema = require("../schema/itemSchema");

const fetchResturants = async (req, res, next) => {
  const restrau_Id = req.query.id;
  try {
    const query = `SELECT 
        m.name AS menu_name,
        d.name AS dish_name,
        d.description AS description,
        d.price AS price,
        d.dish_image AS dish_image
    FROM 
        restaurants r
    JOIN 
        menu m ON r.restaurant_id = m.restaurant_id
    JOIN 
        dishes d ON m.menu_id = d.menu_id
    JOIN 
        restaurants h ON r.restaurant_id = h.restaurant_id
    WHERE 
        h.restaurant_id = ?;`;
    const itemData = await customRecord(query, [restrau_Id]);

    const transformedData = itemData.reduce((acc, item) => {
      // If this menu category doesn't exist yet, create it with an empty array
      if (!acc[item.menu_name]) {
        acc[item.menu_name] = [];
      }

      // Push the dish to the appropriate menu category array
      acc[item.menu_name].push({
        dish_name: item.dish_name,
        dish_description: item.description,
        dish_price: item.price,
        dish_image: item.dish_image,
      });

      return acc;
    }, {});

    APIData(transformedData)(req, res);
    if (Object.values(transformedData).length == 0) {
      console.log(`Hotel Id:${restrau_Id}, Data not Found!`);
    } else {
      console.log(`Hotel Id:${restrau_Id}, Data fetched successfully!`);
    }
  } catch (err) {
    next(new APIError("Data not Found", 200, false, null));
    console.log(`Hotel Id:${restrau_Id}, Data not Found!`);
  }
};

const insertItems = async (req, res, next) => {
  const filesData = req.files;
  const imagesPath = filesData.map((data) => {
    return data.path;
  });

  console.log(imagesPath);

  const images_path = JSON.stringify(imagesPath);

  const { restaurant_name, address, email, password } = req.body;

  const item = {
    name,
    description,
    min_entries,
    max_entries,
    quantity,
    start_date,
    end_date,
    ticket_price,
    images_path,
  };

  try {
    await createTable(itemSchema);
    const itemAlreadyExists = await checkRecordExists("items", "name", name);
    if (itemAlreadyExists) {
      // res.status(409).json({
      //   error: "Try with some other name!",
      // });
      next(new AppError("Try with other name!", 409, false));
    } else {
      await insertRecord("items", item);
      // res.status(201).json({ message: "Item added successfully" });
      customResponse("Item added successfully!", 201)(req, res);
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  fetchResturants,
  insertItems,
};
