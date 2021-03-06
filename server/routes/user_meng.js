const User = require('../../models/users');
const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');
var nodemailer = require('nodemailer');

var MongoClient = require('mongodb').MongoClient;

var mongoose = require('mongoose');//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
//var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority" 
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend";

const sendMail=(email,password)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'S.Hflowers.inc@gmail.com',
      pass: 'dudezwqpctgazibo'
    }
  });
  var mailOptions = {
    from: 'noreply@gmail.com',
    to: email,
    subject: 'Helping Hands support',
    text: 'Thank you, your password is: '+password+ '\n\n\n Helping Hands Support Team'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);

    }
  });
}

 router.post('/addNewUser',async function(req, res,next) {
  try{
    var flag=false;
    
     await MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      var dbo =  db.db("helpHend");
      dbo.collection("users").find({email:req.body.email}).toArray( async function(err, result) {
        if (err) throw err;
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
          var password= Math.floor(10000000+Math.random()*90000000);
          var user={
            type: req.body.type,
            fname: req.body.fname,
            lname: req.body.lname,
            address: req.body.address,
            salery:req.body.salary,
            age:req.body.age,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: await bcrypt.hash(String(password),10),
            status : "1",
            };
                  var x = await dbo.collection("users").insertOne(user);
          sendMail(req.body.email,password)
                    setTimeout(() => { res.json({
                      status: 'success',
                      data:'true',
                      message:"success"
                    }); }, 1000);       
                }
                 else if (flag==false){
                  var password= Math.floor(10000000+Math.random()*90000000);
                  
                          user={
                            type: req.body.type,
                            fname: req.body.fname,
                            lname: req.body.lname,
                            address: req.body.address,
                            salery:req.body.salery,
                            age:req.body.age,
                            phone_number: req.body.phone_number,
                            email: req.body.email,
                            password: await bcrypt.hash(String(password),10),
                            status : "1",
                            workToday:false,
                            area:"0"
                            };
                            var x = await dbo.collection("users").insertOne(user);
                            sendMail(req.body.email,password)
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
    workToday: req.body.workToday
    };

}
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("helpHend");
      var myquery = { _id: mongoose.Types.ObjectId(req.body._id) };
      var newvalues = { $set: user};
      dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
        if (err) throw err;
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
