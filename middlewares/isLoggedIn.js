const jwt = require("jsonwebtoken");
const { JWT_USER, JWT_OWNER } = require("../config/config");
const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");

async function isLoggedInOwner(req, res, next) {
  if (!req.cookie.token) {
    req.flash("error", "You are not loggedin");
    return res.redirect("/");
  }

  try {
    decoded = jwt.verify(req.cookie.token, JWT_OWNER);
    const owner = await ownerModel.findOne({
      id: decode._id,
    });

    req.owner = owner;
    next();
  } catch (err) {
    res.status(500).send("Something went wrong");
    res.redirect("/");
  }
}

async function isLoggedInUser(req, res, next) {
  if (!req.cookie.token) {
    req.flash("error", "You are not loggedin");
    return res.redirect("/");
  }

  try {
    decoded = jwt.verify(req.cookie.token, JWT_USER);
    const user = await userModel.findOne({
      id: decode._id,
    });

    req.user = user;
    next();
  } catch (err) {
    res.status(500).send("Somthing went wrong");
    res.redirect("/");
  }
}

module.exports = {
  isLoggedInOwner,
  isLoggedInUser,
};
