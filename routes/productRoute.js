const express = require("express");
const productRoute = express.Router();
const products = require("../models/product-model");
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

productRoute.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "Product added successfully");
    res.redirect("/owner/admin");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = productRoute;
