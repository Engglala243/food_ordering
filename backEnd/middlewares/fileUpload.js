const multer = require("multer");
const path = require("path");
const { AppError } = require("../utils/customErrors");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/item/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Create the Multer middleware function

module.exports = (fieldName, maxCount) => {
  return (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, (err) => {
      if (err) {
        // res.json({
        //   status: false,
        //   message: `File / Image Upload ${err}`,
        // });
        next(new AppError(`File / Image Upload ${err}`, 500, false));
      } else {
        next();
      }
    });
  };
};
