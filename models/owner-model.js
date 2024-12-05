const mongoose = require("mongoose");

const ownerModel = mongoose.Schema({
    email: String,
    fullname: String,
    password: String,
    isAdmin: Boolean,
    phoneNumber: Number,
    picture: String
});

module.exports = mongoose.model("owner", ownerModel);