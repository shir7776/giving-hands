const User = require('../../models/users');
const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
//var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority" 
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend";

router.post('/initialization',async function(req, res,next) {
try{
    await MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("helpHend");
        var myquery = {status: "1", workToday: true };
        var newvalues = { $set: {workToday: false, area:"0"} };
        await dbo.collection("users").updateOne(myquery, newvalues, async function(err, result) {
          if (err) throw err; 
        await db.close();
        });
      });
      await MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("helpHend");
        await dbo.collection("daily-distribution").deleteMany({});
        await db.close();
      });

}catch{
    res.status(500).send();

}

});




module.exports = router;