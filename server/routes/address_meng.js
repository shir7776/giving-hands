const DD = require('../../models/dailyDist');
const express = require('express');
var router = express.Router();
// const bcrypt=require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
//var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend";

router.post('/addNewAddress',async function(req, res,next) {
    console.log("in adding new address")
    try{
      var address={
        address:req.body.address,
        lat:req.body.lat,
        lng:req.body.lng,
        status:"1"
        
    };
       await MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        var dbo =  db.db("helpHend");
        var myQray={lat:req.body.lat, lng:req.body.lng};
        dbo.collection("addresses-for-distribution").find(myQray).toArray( async function(err, result) {
          if (err) throw err;
          console.log(result);
          if(result.length!=0)
          {
            setTimeout(() => { res.json({
              status: 'failed',
              data:'false',
              message:"This address is already exist"
            }); }, 1000);
       
          }
          var x = await dbo.collection("addresses-for-distribution").insertOne(address);     
         await db.close();
        });});
      }catch{
        res.status(500).send();
      }
  
  });

router.post('/updateAddress',async function(req, res,next) {
    try{
      var address={
          address:req.body.address,
          lat:req.body.lat,
          lng:req.body.lng
          
      };
   await MongoClient.connect(url, function(err, db) {
       if (err) throw err;
       var dbo = db.db("helpHend");
       var myquery = {_id:req.body._id };
       var newvalues = { $set: address};
       dbo.collection("addresses-for-distribution").updateOne(myquery, newvalues, function(err, result) {
         if (err) throw err;
         db.close();
         res.json(result);
       });
     });
   }
   catch{
       res.status(500).send();
     }
  });




router.post('/deleteAddress',async function(req, res,next) {
    try{
   MongoClient.connect(url, function(err, db) {
       if (err) throw err;
       var dbo = db.db("helpHend");
       var myquery = {_id:req.body._id };
       var newvalues = {status: "0"};
       dbo.collection("addresses-for-distribution").updateOne(myquery, newvalues, function(err, result) {
         if (err) throw err;
         db.close();
         res.json(result);
       });
     });
   }
   catch{
       res.status(500).send();
     }
  });


module.exports = router;