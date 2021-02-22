const mongoose = require('mongoose'); 
const Schema = mongoose.Schema
const UserSchema = new mongoose.Schema({
    __id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    Max_calories: {
      type: Number,
      default: 0
    }
  });
  
  const User = mongoose.model('User', UserSchema);
  
  module.exports = User;