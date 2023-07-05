const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;