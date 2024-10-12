module.exports = () => {
  return (req, res, next) => {
    const bearerToken = req.headers.authorization;
    console.log(bearerToken);
    if (!bearerToken) {
    }
    next();
  };
};
