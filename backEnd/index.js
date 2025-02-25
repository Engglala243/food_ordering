const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./db/db");
const router = require("./routes/index.js");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

// Connect to the database
connectDB();

const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (for API requests)
app.use(express.json({ limit: "10mb" })); // Increase payload size limit if needed

// Serve static files from the "public" directory
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.use("/", router);

// Default route
app.get("/", (req, res) => {
  res.send("From the Backend!");
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
