const {Schema, default: mongoose} = require("mongoose");

const userModel = new Schema({
    email: String,
    fullname: String,
    password: String,
    cart:{
        type: Array,
        default: []
    },
    orders:{
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    phoneNumber: Number,
    picture: String
});

module.exports = mongoose.model("user", userModel);