const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schema/userSchema");
const restaurantSchema = require("../schema/restaurantSchema");
const bcrypt = require("bcrypt");
const { transporter } = require("../utils/mailerUtil");

const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunctions");
const { customResponse } = require("../utils/customResponse");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const createdBy = name;

  const user = {
    uuid: uuidv4(),
    name,
    email,
    password: hashedPassword,
    created_by: createdBy,
  };

  try {
    await createTable(userSchema);
    const userAlreadyExists = await checkRecordExists("users", "email", email);
    if (userAlreadyExists) {
      customResponse("Email already exists", 409, false)(req, res);
      // res.status(409).json({ error: "Email already exists" });
    } else {
      await insertRecord("users", user);
      customResponse("User created successfully", 201, true)(req, res);
      // res.status(201).json({ message: "User created successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await checkRecordExists("users", "email", email);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password,
      );

      if (passwordMatch) {
        const payload = {
          uuid: existingUser.uuid,
          user_id: existingUser.id,
        };
        res.status(200).json({
          uuid: existingUser.uuid,
          user_id: existingUser.id,
          email: existingUser.email,
          access_token: generateAccessToken(payload),
        });
      } else {
        res.status(401).json({ error: "Invalid credentials " });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const restau_register = async (req, res, next) => {
  const {
    restaurant_name,
    street,
    pincode,
    state,
    country,
    city,
    phone,
    email,
    password,
  } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const createdBy = restaurant_name;

  // const address = `${street}, ${country}, ${city}`;

  const restaurant = {
    uuid: uuidv4(),
    restaurant_name,
    email,
    phone,
    password: hashedPassword,
    created_by: createdBy,
    city,
    country,
    pincode,
    state,
    street,
  };

  try {
    await createTable(restaurantSchema);
    const userAlreadyExists = await checkRecordExists(
      "restaurants",
      "email",
      email,
    );
    if (userAlreadyExists) {
      customResponse("Email already exists", 409, false)(req, res);
      // res.status(409).json({ error: "Email already exists" });
    } else {
      await insertRecord("restaurants", restaurant);
      customResponse("Restaurant Registered Successfully", 201, true)(req, res);
      // res.status(201).json({ message: "User created successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const restau_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await checkRecordExists("restaurants", "email", email);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password,
      );

      const payload = {
        restaurant_id: existingUser.restaurant_id,
      };

      if (passwordMatch) {
        res.status(200).json({
          uuid: existingUser.uuid,
          restaurant_id: existingUser.restaurant_id,
          email: existingUser.email,
          access_token: generateAccessToken(payload),
        });
      } else {
        res.status(401).json({ error: "Invalid credentials " });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error, "<==ERRR");
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  restau_register,
  restau_login,
};
