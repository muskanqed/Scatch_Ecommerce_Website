const express = require("express");
const productRoute = express.Router();

productRoute.get('/', (req, res) => {
    res.send("Hey");
})

module.exports = productRoute;