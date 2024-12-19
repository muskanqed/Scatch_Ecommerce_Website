const express = require("express");
const router = express.Router();
const { isLoggedInUser } = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  const error = req.flash("error");

  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedInUser, async (req, res) => {
  try {
    const products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
  } catch (err) {
    res.status(500).send("Error retrieving products");
    console.log(err);
  }
});

router.get("/addtocart/:productid", isLoggedInUser, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });

    if (user.cart.includes(req.params.productid)) {
      req.flash("info", "Product is already in your cart.");
      return res.redirect("/shop");
    }
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to the cart");
    res.redirect("/shop");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    req.flash(
      "error",
      "Something went wrong while adding the product to the cart."
    );
    res.redirect("/shop");
  }
});

module.exports = router;
