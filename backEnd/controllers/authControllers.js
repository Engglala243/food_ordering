const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schema/userSchema");
const bcrypt = require("bcrypt");

const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunctions");
const { customResponse } = require("../utils/customResponse");

const generateAccessToken = (uuid) => {
  return jwt.sign({ uuid }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const createdBy = first_name;

  const user = {
    uuid: uuidv4(),
    first_name,
    last_name,
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
        res.status(200).json({
          uuid: existingUser.uuid,
          email: existingUser.email,
          access_token: generateAccessToken(existingUser.uuid),
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

module.exports = {
  register,
  login,
};
