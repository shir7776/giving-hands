const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend";

 

router.post('/satisticByWeek',async function(req, res,next) {
    var array=new Array();
    try{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("helpHend");
            var d = new Date();
            var n = d.getDay();
            for(var i=0; i<n;i++){
            var myquery = {date: new Date(d.setDate(new Date().getDate()-i))};
            dbo.collection("satistic").find({myquery}).toArray(function(err, result) {
              if (err) throw err;
              db.close();
              array.push(result);
              //res.json(result);
            });
            res.json(array);
        }
          });
        }
        catch{
            res.status(500).send();
          }



});



router.post('/satisticByMonth',async function(req, res,next) {
    var array=new Array();
    try{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("helpHend");
            var d = new Date();
            for(var i=0; i<30;i++){
            var myquery = {date: new Date(d.setDate(new Date().getDate()-i))};
            dbo.collection("satistic").find({myquery}).toArray(function(err, result) {
              if (err) throw err;
              db.close();
              array.push(result);
              //res.json(result);
            });
            res.json(array);
        }
          });
        }
        catch{
            res.status(500).send();
          }
});


module.exports = router;