const express = require("express");
const ownerRoute = express.Router();
require('dotenv').config();
const ownerModel = require("../models/owner-model");

ownerRoute.get('/', async (req, res) => {
    const owner = await ownerModel.findOne().select("fullname");
    res.send(owner);
})


if (process.env.NODE_ENV === "development") {
    ownerRoute.post('/create', async (req, res) => {

        const { email, fullname, password } = req.body;

        const ownerExist = await ownerModel.find()
        if (ownerExist.length > 0) {
            res.status(504).send("Owner already exits you cannot create the owner");
        }
        else {
            const owner = await ownerModel.create({
                email,
                fullname,
                password
            })

            res.status(200).send("owner created");
        }


    });
}

module.exports = ownerRoute;