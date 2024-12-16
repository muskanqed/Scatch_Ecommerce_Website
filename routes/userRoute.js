const express = require("express");
const bcrypt = require("bcrypt");
const userRoute = express.Router();
const userModel = require("../models/user-model");
const zod = require('zod');

const user = zod.object({
    email: zod.string().email(),
    fullname: zod.string().min(5, "Full name must be at least 5 characters"),
    password: zod.string().min(5, "Full name must be at least 5 characters")
})

userRoute.get('/', async (req, res) => {
    const users = await userModel.find().select("fullname");

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

            hashedPassword = await bcrypt.hash(password, 5);

            await userModel.create({
                email,
                fullname,
                password: hashedPassword

            })

            res.status(200).json({
                message: "User created successfully"
            })
        }
    } catch (err) {
        res.status(500).send("Internal server Error");
    }
})



module.exports = userRoute;