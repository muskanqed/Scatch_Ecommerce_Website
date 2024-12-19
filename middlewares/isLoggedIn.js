const jwt = require("jsonwebtoken");
const { JWT_USER, JWT_OWNER } = require("../config/config");
const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");

async function isLoggedInOwner(req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "You are not logged in as owner");
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(req.cookies.token, JWT_OWNER);
    const owner = await ownerModel.findOne({
      _id: decoded.id,
    });

    if (!owner) {
      req.flash("error", "Owner not found");
      return res.redirect("/");
    }

    req.owner = owner;
  } catch (err) {
    console.error(err);
    req.flash("error", "Invalid or expired token");
    res.redirect("/");
  }
}

async function isLoggedInUser(req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "You are not logged in as user");
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(req.cookies.token, JWT_USER);
    const user = await userModel
      .findOne({
        _id: decoded.id,
      })
      .select("-password");

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    req.flash("error", "Invalid or expired token");
    res.redirect("/");
  }
}

module.exports = {
  isLoggedInOwner,
  isLoggedInUser,
};
