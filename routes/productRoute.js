const express = require("express");
const productRoute = express.Router();
const products = require("../models/product-model");


productRoute.get('/', (req, res) => {
    res.send("Hey");
})

module.exports = productRoute;