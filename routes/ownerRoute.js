const express = require("express");
const ownerRoute = express.Router();
require("dotenv").config();
const zod = require("zod");
const bcrypt = require("bcrypt");
const { JWT_OWNER } = require("../config/config");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const ownerModel = require("../models/owner-model");
const { generateTokenOwner } = require("../utils/generateToken");

const owner = zod.object({
  email: zod.string().email(),
  fullname: zod.string().min(5, "Full name must be at least 5 characters"),
  password: zod.string().min(5, "Password must be at least 5 characters"),
});

ownerRoute.get("/", async (req, res) => {
  const owner = await ownerModel.findOne().select("fullname");
  res.send(owner);
});

if (process.env.NODE_ENV === "development") {
  try {
    ownerRoute.post("/create", async (req, res) => {
      const { email, fullname, password } = req.body;

      const parseResult = owner.safeParse({ email, fullname, password });

      if (!parseResult.success) {
        return res.status(404).json({
          message: "Invaild inputs",
          error: parseResult.error.errors,
        });
      }

      const ownerExist = await ownerModel.find();
      if (ownerExist.length > 0) {
        return res
          .status(504)
          .send("Owner already exits you cannot create the owner");
      } else {
        const hashedPassword = await bcrypt.hash(password, 5);
        const owners = await ownerModel.create({
          email,
          fullname,
          password: hashedPassword,
        });

        res.status(200).send("owner created");
      }
    });
  } catch (err) {
    res.status(500).send("Internal server Error");
  }

  ownerRoute.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;

      const owner = await ownerModel.findOne({
        email,
      });

      if (!owner) {
        return res.send("User not found");
      }
      const passwordMatch = await bcrypt.compare(password, owner.password);

      if (!passwordMatch) {
        res.send("Incorrect creds");
      }

      const token = generateTokenOwner(owner);

      res.cookie("token", token, {
        httpOnly: true, // Prevents access from client-side scripts
        secure: process.env.NODE_ENV === "development",
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Signin successful",
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
}

ownerRoute.get('/admin',async (req,res)=>{
  const success = req.flash("success");
  res.render("createproducts", { success});
})

module.exports = ownerRoute;
