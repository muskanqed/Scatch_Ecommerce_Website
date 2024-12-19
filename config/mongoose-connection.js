require("dotenv").config();
const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const url = process.env.MONGO_URL;

async function connectToDb() {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
    })
    .then(() => {
      dbgr("Database connected successfully");
    })
    .catch((error) => {
      dbgr(error);
    });
}

module.exports = {
  connectToDb,
};
