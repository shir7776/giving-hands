const DD = require('../../models/dailyDist');
const express = require('express');
var router = express.Router();
// const bcrypt=require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"



router.post('/addAddressDaily',async function(req, res,next) {
    try{
        var daily_distr=[];
        daily_distr[0]= req.body.id_daily;
        daily_distr[1]= req.body.date;
        daily_distr[2] = req.body.email;
        daily_distr[3] = req.body.id_addr;
        daily_distr[4] = "0";//done: yes 1 no 0
   MongoClient.connect(url, function(err, db) {
       if (err) throw err;
       var dbo = db.db("helpHend");
       var myquery = { id_daily: req.body.id_daily };
       dbo.collection("daily-distribution").find({myquery}).toArray(function(err, result) {
         if (err) throw err;
         if(result.length!=0){
            setTimeout(() => { res.json({
                status: 'failed',
                data:'false',
                message:"This id_daily is already exist"
              }); }, 1000);

         }
         else{
            DD.CREATE(daily_distr);
            console.log('daily_distr created:' + daily_distr);
            setTimeout(() => { res.json({
              status: 'success',
              data:'true',
              message:"success"
            }); }, 1000);   
         }
         db.close();
       });
     });
   }
   catch{
       res.status(500).send();
     }
});
 


 router.post('/addressNotDeliv',async function(req, res,next) {
     try{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("helpHend");
        var myquery = { done: "0" };
        dbo.collection("daily-distribution").find({myquery}).toArray(function(err, result) {
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



 router.post('/updateDailyDeliv',async function(req, res,next) {
  try{
    var daily_distr=[];
        daily_distr[0]= req.body.id_daily;
        daily_distr[1]= req.body.date;
        daily_distr[2] = req.body.email;
        daily_distr[3] = req.body.id_addr;
        daily_distr[4] = req.body.done;//done: yes 1 no 0

 MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     var dbo = db.db("helpHend");
     var myquery = {id_daily:req.body.id_daily };
     var newvalues = { $set: daily_distr};
     dbo.collection("daily-distribution").updateOne(myquery, newvalues, function(err, result) {
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



router.post('/deleteDailyDeliv',async function(req, res,next) {
  try{
 MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     var dbo = db.db("helpHend");
     var myquery = {_id:req.body._id, done: "0" };
     var newvalues = {done: "1"};
     dbo.collection("daily-distribution").updateOne(myquery, newvalues, function(err, result) {
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