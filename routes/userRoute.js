const express = require("express");
const userRoute = express.Router();
const userModel = require("../models/user-model");
const zod = require('zod');

const user = zod.object({
    email: zod.string().email(),
    fullname: zod.string().min(5, "Full name must be at least 5 characters"),
    password: zod.string().min(5, "Full name must be at least 5 characters")
})

userRoute.get('/', async (req, res) => {
    const users = await userModel.find();

    res.send(users);
});

userRoute.post('/signup', async (req, res) => {
    try {

        const { email, fullname, password } = req.body;

        const parseResult = user.safeParse({ email, fullname, password });

        if (!parseResult.success) {
            res.status(404).json({
                message: "Invaild inputs",
                error: parseResult.error.errors
            })
        }
        const userExits = await userModel.findOne({ email });

        if (userExits) {
            res.status(409).send("User already exits please signin")
        }
        else {
            await userModel.create({
                email,
                fullname,
                password
            })
        }
    } catch (err) {
        res.status(500).send("Internal server Error");
    }
})



module.exports = userRoute;