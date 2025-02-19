const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { customResponse } = require("../utils/customResponse");

const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Get restaurant name and menu category from the request
    const restaurantName = req.user.restaurant_name.replace(/\s+/g, "_");
    const menuQuery = `SELECT name FROM menu WHERE menu_id = ?`;

    req
      .customRecord(menuQuery, [req.body.menu_id])
      .then(([menuResult]) => {
        const categoryName = menuResult.name.replace(/\s+/g, "_");

        // Create directory path
        const baseDir = path.join("public", restaurantName);
        const categoryDir = path.join(baseDir, categoryName);

        // Create directories if they don't exist
        createDirIfNotExists(baseDir);
        createDirIfNotExists(categoryDir);

        // Store directory path in request for later use
        req.uploadDir = categoryDir;

        cb(null, categoryDir);
      })
      .catch((err) => {
        cb(new Error("Error getting menu category"));
      });
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExt);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Middleware to handle file upload errors
const handleFileUpload = (req, res, next) => {
  const uploadMiddleware = upload.single("dish_image");

  uploadMiddleware(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer error (e.g., file too large)
      return customResponse(err.message, 400, false)(req, res);
    } else if (err) {
      // Other errors
      return customResponse(err.message, 500, false)(req, res);
    }
    // Success - continue to next middleware
    next();
  });
};

module.exports = {
  handleFileUpload,
};
