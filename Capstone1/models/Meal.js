const mongoose = require('mongoose');
const User = require('./User')
const Schema = mongoose.Schema
const MealSchema = new mongoose.Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:User
  },
  mealname:{
    type:String,
    required:true
  },
  mealtype: {
    type: String,
    required:true,
  },
  description: {
    type: String,
    min: 20,
  },
  
  calories:{
    type:Number
  },
  date: {
    type: Date,
    default: Date.now
  }

});

 
const Meal = mongoose.model('Meal', MealSchema);
module.exports = Meal;
// module.exports= User;







