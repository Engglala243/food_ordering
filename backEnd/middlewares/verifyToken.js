const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log(req.headers, "<===Request Headers");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      status: 401,
      message: "Unauthorized access",
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({
        status: 401,
        message: "Unauthorized access",
      });
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
