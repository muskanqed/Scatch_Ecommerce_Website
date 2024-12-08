const express = require("express");
const userRoute = express.Router();
const userModel = require("../models/user-model");


userRoute.get('/', (req, res) => {
    res.send("Hey");
})

module.exports = userRoute;