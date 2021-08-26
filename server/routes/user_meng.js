const User = require('../../models/users');
const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority" 



 router.post('/addNewUser',async function(req, res,next) {
  try{
    var user=[];
    user[0]= req.body.fname;
    user[1]= req.body.lname;
    user[2] = req.body.address;
    user[3] = req.body.age;
    user[4] = req.body.salery;
    user[5] =req.body.phone_number;
    user[6] =req.body.email;
    user[7] =req.body.password;
    user[8] = req.body.type;
    user[9] = "1";//status
   (async()=>{ await MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo =  db.db("helpHend");
      dbo.collection("users").find({email: user[6]},{ projection: { email: user[6]} }).toArray( function(err, result) {
        if (err) throw err;
        if(result.length!=0)
    {
      setTimeout(() => { res.json({
        status: 'failed',
        data:'false',
        message:"This email is already exist"
      }); }, 1000);
     
    }
    
    else if (req.body.type == "manager"){
      User.CREATE(user);
        console.log('User created:' + user);
        setTimeout(() => { res.json({
          status: 'success',
          data:'true',
          message:"success"
        }); }, 1000);       
    }
    else{
      user[10]=false;//workToday
      user[11]="0";//area
         User.CREATE(user);
        console.log('User created:' + user);
        setTimeout(() => { res.json({
          status: 'success',
          data:'true',
          message:"success"
        }); }, 1000);       
    } 
        db.close();
      });

    });
  })();
    
    
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
  password: req.body.password,
  status : req.body.status,
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
    status : req.body.status,
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
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("helpHend");
    var myquery = { _id: req.body._id, status: "1", workToday: true };
    var newvalues = { $set: {area: req.body.area} };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log("1 document updated");
    });
    var myquery = { area: req.body.area};
    var newvalues = { $set: {id_user: req.body._id} };
    dbo.collection("daily-distribution").updateMany(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log("documents updated");
    });
    db.close();
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
