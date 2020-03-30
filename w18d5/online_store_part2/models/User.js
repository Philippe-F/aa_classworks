const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.statics.signUp = async function(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const User = mongoose.model("User");
  const user = new User({
    email: email,
    password: hashedPassword
  });
  await user.save();

  const token = jwt.sign({ _id: user._id }, JWT_SECRET);

  user.token = "Bearer " + token;
  await user.save();

  return user;
};

module.exports = mongoose.model("User", UserSchema);
