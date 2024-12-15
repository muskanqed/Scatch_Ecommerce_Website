const express = require("express");
const ownerRoute = express.Router();
require('dotenv').config();
const zod = require('zod');
const ownerModel = require("../models/owner-model");

const owner = zod.object({
    email: zod.string().email(),
    fullname: zod.string().min(5, "Full name must be at least 5 characters"),
    password: zod.string().min(5, "Password must be at least 5 characters")
});


ownerRoute.get('/', async (req, res) => {
    const owner = await ownerModel.findOne().select("fullname");
    res.send(owner);
})


if (process.env.NODE_ENV === "development") {
    try {
        ownerRoute.post('/create', async (req, res) => {

            const { email, fullname, password } = req.body;

            const parseResult = owner.safeParse({ email, fullname, password });

            if (!parseResult.success) {
                return res.status(404).json({
                    message: "Invaild inputs",
                    error: parseResult.error.errors
                })
            }

            const ownerExist = await ownerModel.find()
            if (ownerExist.length > 0) {
                res.status(504).send("Owner already exits you cannot create the owner");
            }
            else {
                const owners = await ownerModel.create({
                    email,
                    fullname,
                    password
                })

                res.status(200).send("owner created");
            }
        });
    } catch (err) {
        res.status(500).send("Internal server Error");
    }
}

module.exports = ownerRoute;