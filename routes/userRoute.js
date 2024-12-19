const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const userRoute = express.Router();
const userModel = require("../models/user-model");
const zod = require("zod");
const { generateTokenUser } = require("../utils/generateToken");

const user = zod.object({
  email: zod.string().email(),
  fullname: zod.string().min(5, "Full name must be at least 5 characters"),
  password: zod.string().min(5, "Full name must be at least 5 characters"),
});

userRoute.get("/", async (req, res) => {
  const users = await userModel.find().select("fullname");

  res.send(users);
});

userRoute.post("/register", async (req, res) => {
  try {
    const { email, fullname, password } = req.body;

    const parseResult = user.safeParse({ email, fullname, password });

    if (!parseResult.success) {
      return res.status(404).json({
        message: "Invaild inputs",
        error: parseResult.error.errors,
      });
    }
    const userExits = await userModel.findOne({ email });

    if (userExits) {
      return res.status(409).send("User already exits please signin");
    } else {
      hashedPassword = await bcrypt.hash(password, 5);

      await userModel.create({
        email,
        fullname,
        password: hashedPassword,
      });

      res.status(200).json({
        message: "User created successfully",
      });
    }
  } catch (err) {
    return res.status(500).send("Internal server Error");
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send("User not found, please register yourself");
    }

    passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.send("Incorrect creds");
    }
    const token = generateTokenUser(user);

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
    });

    res.redirect("/shop");
  } catch (err) {
    return res.status(500).send("Internal server Error", err);
  }
});

userRoute.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

module.exports = userRoute;
