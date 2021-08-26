const User = require('../../models/users');
const AFD = require('../../models/addressForDistr');
const Blogs = require('../../models/addressForDistr');
const DD = require('../../models/dailyDist');
const express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend";
//var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"

 

router.get("/users.json",function(req,res,next){
     MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         var dbo = db.db("helpHend");
         dbo.collection("users").find({ststus:"1"}).toArray(function(err, result) {
           if (err) throw err;
           db.close();
           console.log(result)
           res.json(result);
         });
       });
  });

  router.get("/usersDayly.json",function(req,res,next){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("helpHend");
        dbo.collection("users").find({ststus:"1",workToday:true}).toArray(function(err, result) {
          if (err) throw err;
          db.close();
          console.log(result)
          res.json(result);
        });
      });
 });

  router.get("/addresses-for-distribution.json",function(req,res,next){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("helpHend");
    dbo.collection("addresses-for-distribution").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      console.log(result)
      res.json(result);
    });
  });

});

router.get("/blogs.json",function(req,res,next){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("helpHend");
    dbo.collection("blogs").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  });
});
router.get("/api",function(req,res,next){
  res.json({message: "Hello from server!000"});


});

router.get("/daily-distribution.json",function(req,res,next){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("helpHend");
      dbo.collection("daily-distribution").find({}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        console.log(result)
        res.json(result);
      });
    });
  });

  

module.exports=router;

