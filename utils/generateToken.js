const jwt = require("jsonwebtoken");
const { JWT_OWNER, JWT_USER } = require("../config/config");

const generateTokenOwner = (owner) => {
  const token = jwt.sign(
    {
      id: owner._id,
    },
    JWT_OWNER,
    { expiresIn: "1h" }
  );
  return token;
};

const generateTokenUser = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    JWT_USER,
    { expiresIn: "1h" }
  );
  return token;
};

module.exports = {
  generateTokenOwner,
  generateTokenUser,
};
