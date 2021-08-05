const User = require('../../models')("users");
const AFD = require('../../models')("addressForDistr");
const Blogs = require('../../models')("blogs");
const DD = require('../../models')("dailyDist");
const DA = require('../../models')("divisionalAraes");
const express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";

 

router.get("/users.json",function(req,res,next){
     MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         var dbo = db.db("helpHend");
         dbo.collection("users").find({}).toArray(function(err, result) {
           if (err) throw err;
           db.close();
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

router.get("/daily-distribution.json",function(req,res,next){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("helpHend");
      dbo.collection("daily-distribution").find({}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        res.json(result);
      });
    });
  });

  router.get("/divisional-areas.json",function(req,res,next){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("helpHend");
      dbo.collection("divisional-areas").find({}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        res.json(result);
      });
    });
  });

module.exports=router;
