const { Schema, default: mongoose } = require("mongoose");

const userModel = new Schema({
  email: String,
  fullname: String,
  password: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  orders: {
    type: Array,
    default: [],
  },
  phoneNumber: Number,
  picture: String,
});

module.exports = mongoose.model("user", userModel);
