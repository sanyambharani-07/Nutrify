const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const Meal=require("../models/Meal"); 
var verifyAuth = require('../middleware/Auth');

app.use(express.urlencoded({extended: true}))

// app.use(function(req, res, next) {
//   res.locals.currentUser = req.user;
//   next();
// });
// var getCalories = async (mealName) => {
//   var calories = -1;
//   var response = await fetch(config.nutritionixEndPoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-app-id': 'd8e06552',
//       'x-app-key': '4cd8c77632446b09fb465e75d34b42c4',
//       'x-remote-user-id': 0,
//     },
//     body: JSON.stringify({ query: mealName }),
//   });
//   console.log('response');
//   return response.json();
// };



router.post("/tracker",verifyAuth,  (req, res) => {    
   var myData = new Meal(req.body);
    myData.userId = req.userInfo._id;
    myData.save().
    then(()=> {
        res.send('Meal posted successfully');
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
}); 

router.get('/',verifyAuth,async  (req, res) =>{
  console.log('get meal request');
  try {
    let mealModel;
    // if (userType == 'user') {
    
    // }
    mealModel = await Meal.find({userId:req.userInfo._id});
    res.status(200).send({
      error: false,
      message: 'User Meals!!',
      errObj: null,
      meals: mealModel,
      
    });
    // console.log(mealModel)
    // res.redirect("/tracker");
  } catch (e) {
    res.status(404).send({
      error: true,
      message: 'Something went wrong!!',
      errObj: e,
    });
  }
  // console.log(mealModel)
}
  
);

// router.get('/add-meal',  (req, res) =>
//   res.render('meal')
// ); 

// router.get('/dashboard-meal',  (req, res) =>
//   res.render('test')
// );

 


router.get('/sortby', verifyAuth,async  (req, res) =>{
  try {
    mealModel = await Meal.find({userId:'5ff93f692db6a660d01c102a'}).sort({calories:-1});

    res.status(200).send({
      error: false,
      message: 'User Meals!!',
      errObj: null,
      meals: mealModel, 
    });
    // console.log(mealModel)
    // res.redirect("/tracker");
  } catch (e) {
    res.status(404).send({
      error: true,
      message: 'Something went wrong!!',
      errObj: e,
    });
  }
  // console.log(mealModel)
}
  
);

router.patch('/:mealId', verifyAuth, async (req, res) => {
  console.log(req.body.data);
  // console.log('body req', req);
  // req.body.data.forEach((ops) => {
  //   updateOps[ops.propName] = ops.value;
  // });
  // some other method to update
  // const updateduser = await Meal.updateOne(
  //   { _id: req.params.mealId },
  //   { $set: updateOps }
  // );
  const update = {
    'mealname':req.body.data.mealname,
    'mealtype':req.body.data.mealtype,
    'description':req.body.data.description,
  }
  
  Meal.updateOne({ _id: req.params.mealId }, { $set: update })
    .exec()
    .then((response) => {
      res.status(200).send({
        error: false,
        message: 'Meal updated successfully',
        response: response,
      });
    })
    .catch((error) => {
      res.status(404).send({
        error: true,
        message: 'Something went wrong!!',
        errObj: error,
      });
    });
});
router.delete('/:mealId', verifyAuth, async (req, res) => {
  try {
    const meal1 = await Meal.deleteOne({ _id: req.params.mealId });
    res.send({
      error: false,
      message: 'Meal deleted successfully!!',
      deleted: meal1,
    });
  } catch (e) {
    res.status(404).send({
      error: true,
      message: 'Something went wrong!!',
      errObj: error,
    });
  }
});




module.exports = router;

