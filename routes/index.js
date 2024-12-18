const express = require("express");
const router = express.Router();
const { isLoggedInUser } = require("../middlewares/isLoggedIn");
const productModel = require('../models/product-model');

router.get("/", (req, res) => {
  const error = req.flash("error");

  res.render("index", { error });
});

router.get("/shop", isLoggedInUser, async (req, res) => {
  try {
    const products = await productModel.find();  // Replace ProductModel with your actual model
    res.render('shop', { products });  // Pass products as an object to the view
  } catch (err) {
    res.status(500).send('Error retrieving products');
    console.log(err);

  }

});

module.exports = router;
