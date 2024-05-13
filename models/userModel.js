const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
    },
    email: {
      type: String,
      required: [true, "please enter email"],
      unique: [true, "email address already taken"],
    },
    phone: {
      type: String,
      required: [true, "please enter phone"],
    },
    password: {
      type: String,
      required: [true, "please enter password"],
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
