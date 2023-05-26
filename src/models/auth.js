const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  hash_password: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active'
  },
  lastLoginTime: {
    type: Date,
    default: () => Date.now(),
  },
  lastRegistrationTime: {
    type: Date,
    default: () => Date.now()
  }

}, { timestamps: true })
userSchema.method({
  async authenticate(password) {
    return bcrypt.compare(password, this.hash_password);
  },
});

module.exports = mongoose.model("User", userSchema);