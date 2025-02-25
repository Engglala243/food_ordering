const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { customRecord } = require("../utils/sqlFunctions");

// Function to create directory if it doesn't exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Custom storage configuration for dish images
const dishImageStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      // Get restaurant ID from authenticated user
      const restaurant_id = req.user.restaurant_id;

      // Get restaurant name for main folder
      const restaurantQuery = `SELECT restaurant_name FROM restaurants WHERE restaurant_id = ?`;
      const restaurantResult = await customRecord(restaurantQuery, [
        restaurant_id,
      ]);
      const restaurantName = restaurantResult[0].restaurant_name;

      // Get menu ID from request
      const menuId = req.body.menuId;

      // Get menu name for category folder
      const menuQuery = `SELECT name FROM menu WHERE menu_id = ?`;
      const menuResult = await customRecord(menuQuery, [menuId]);
      const menuName = menuResult[0].name;

      // Create directory path
      const dirPath = path.join(
        process.cwd(),
        "public",
        restaurantName,
        menuName,
      );

      // Ensure directory exists
      ensureDirectoryExists(dirPath);

      cb(null, dirPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname.replace(/\[|\]/g, "-") + "-" + uniqueSuffix + ext);
  },
});

// Filter to allow only image files
const imageFileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Multer middleware for dish image uploads that handles array fields with dynamic names
const handleDishUpload = (req, res, next) => {
  // Create dynamic fields array based on the request
  const fields = [];
  // We'll determine the actual count in the route handler
  for (let i = 0; i < 10; i++) {
    // Support up to 10 dishes
    fields.push({
      name: `dish${i}`,
      maxCount: 1,
    });
  }

  const upload = multer({
    storage: dishImageStorage,
    fileFilter: imageFileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB max file size
    },
  }).fields(fields);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    }
    next();
  });
};

module.exports = {
  handleDishUpload,
};
