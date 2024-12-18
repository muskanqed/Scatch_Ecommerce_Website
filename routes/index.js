const express = require("express");
const { isLoggedInUser } = require("../middlewares/isLoggedIn");
const router = express.Router();

router.get("/", (req, res) => {
  const error = req.flash("error");

  res.render("index", { error });
});

router.get("/shop", isLoggedInUser, (req, res) => {
  res.render("shop");
});

module.exports = router;
