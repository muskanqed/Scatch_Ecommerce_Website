const mongoose = require("mongoose");
require('dotenv').config();

const url = (process.env.MONGO_URL);

async function dbconnect() {
    await mongoose.connect(url, {
        useNewUrlParser: true
    })
        .then(() => {
            console.log("Connection established successful");
        })
        .catch((error => {
            console.log("Connection failed", error);
        }))
}

module.exports = dbconnect;