const User = require('../../models/users');
const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
//var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority" 
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend";


 router.post('/addNewUser',async function(req, res,next) {
  try{
    var flag=false;
    var user={
      type: req.body.type,
      fname: req.body.fname,
      lname: req.body.lname,
      address: req.body.address,
      salery:req.body.salary,
      age:req.body.age,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
      status : "1",
      };
     await MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      var dbo =  db.db("helpHend");
      dbo.collection("users").find({email:req.body.email}).toArray( async function(err, result) {
        if (err) throw err;
        console.log(result);
        if(result.length!=0)
        {
          flag =true;
          setTimeout(() => { res.json({
            status: 'failed',
            data:'false',
            message:"This email is already exist"
          }); }, 1000);
     
        }
        else if (req.body.type == "manager"&&flag==false){
          console.log(flag)
                  var x = await dbo.collection("users").insertOne(user);
                    setTimeout(() => { res.json({
                      status: 'success',
                      data:'true',
                      message:"success"
                    }); }, 1000);       
                }
                 else if (flag==false){
                   console.log(flag)
                          user={
                            type: req.body.type,
                            fname: req.body.fname,
                            lname: req.body.lname,
                            address: req.body.address,
                            salery:req.body.salery,
                            age:req.body.age,
                            phone_number: req.body.phone_number,
                            email: req.body.email,
                            password: req.body.password,
                            status : "1",
                            workToday:false,
                            area:"0"
                            };
                            var x = await dbo.collection("users").insertOne(user);
                            setTimeout(() => { res.json({
                              status: 'success',
                              data:'true',
                              message:"success"
                            }); }, 1000);       
                          } 
       await db.close();
      });});
    }catch{
      res.status(500).send();
    }

});

router.post('/updetUser',async function(req, res,next) {
try{
  var user;
  console.log(req.body)
  if(req.body.type == "manager"){
  user={
  type: req.body.type,
  fname: req.body.fname,
  lname: req.body.lname,
  address: req.body.address,
  salery:req.body.salery,
  age:req.body.age,
  phone_number: req.body.phone_number,
  email: req.body.email,
  password: req.body.password
  };
}
else{
  user={
    type: req.body.type,
    fname: req.body.fname,
    lname: req.body.lname,
    address: req.body.address,
    salery:req.body.salery,
    age:req.body.age,
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: req.body.password,
    workToday: req.body.workToday
    };

}
    console.log(user)
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("helpHend");
      var myquery = { email: req.body.email };
      var newvalues = { $set: user};
      dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
  
  });

}
  catch{
    res.status(500).send();
  }

});

router.post('/deleteUser',async function(req, res,next) {
  try{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("helpHend");
    var myquery = { email: req.body.email, status: "1" };
    var newvalues = { $set: {status: "0"} };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  
}
catch{
  setTimeout( () => {res.json({
    status: 'faild',
    data:'false',
    message:"something wrong happend in the server try again letter"
  });}, 1000);

}
});

router.post('/updateGiverWithArea',async function(req, res,next) {
  try{
  await MongoClient.connect(url, async function(err, db) {
    if (err) throw err;
    var dbo = db.db("helpHend");
    var myquery = { _id: mongoose.Types.ObjectId(req.body._id), status: "1", workToday: true };
    var newvalues = { $set: {area: req.body.area} };
    await dbo.collection("users").updateOne(myquery, newvalues, async function(err, result) {
      if (err) throw err;
      console.log(result)
    console.log("1 document updated");  
    await db.close();
    });
  });

    await MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      var dbo = db.db("helpHend");
    var myquery = { area: req.body.area};
      var newvalues = { $set: {id_user: req.body._id} };
    await dbo.collection("daily-distribution").updateMany(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log(result)
      console.log("documents updated");
       db.close();
    });
  });
  
}
catch{
  setTimeout( () => {res.json({
    status: 'faild',
    data:'false',
    message:"something wrong happend in the server try again letter"
  });}, 1000);

}
});



module.exports = router;
