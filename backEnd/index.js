<<<<<<< HEAD
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./db/db");
const router = require("./routes/index.js");
const errorHandler = require("./middlewares/errorHandler.js");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

connectDB();

const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("From the Backend!");
});

app.use("/", router);

app.use("/public", express.static("public"));

// app.get("*", (req, res) => {
//   res
//     .status(404)
//     .send("404 Not Found: The requested resource could not be found.");
// });
//

app.use(errorHandler);
=======
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./db/db");
const router = require("./routes/index.js");
const errorHandler = require("./middlewares/errorHandler.js");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

connectDB();

const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("From the Backend!");
});

app.use("/", router);

app.use("/public", express.static("public"));

// app.get("*", (req, res) => {
//   res
//     .status(404)
//     .send("404 Not Found: The requested resource could not be found.");
// });
//

app.use(errorHandler);
>>>>>>> master
