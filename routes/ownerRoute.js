const express = require("express");
const ownerRoute = express.Router();

ownerRoute.get('/', (req, res) => {
    res.send("Hey");
})

module.exports = ownerRoute;