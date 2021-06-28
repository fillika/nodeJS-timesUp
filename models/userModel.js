const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your username"],
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide your username"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
    required: [true, "Please provide password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  passwordChangedAt: Date,
});

UserSchema.pre("save", async function (next) {
  // Если мы изменяем пароль - то пропускаем этот этап
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirm = undefined;
  this.passwordChangedAt = new Date();
  next();
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
