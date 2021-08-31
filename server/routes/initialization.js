const User = require('../../models/users');
const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');
const schedule = require('node-schedule');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
//var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority" 
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend";


schedule.scheduleJob('0 0 0 * * *', async() => { 
  try{
    console.log("i do blaaaaaa")
    var countYes=0;
    var countNo=0;
    var myInsert;
    var lst=new Array();
    var myquery = {status: "1", workToday: true };
    var newvalues = { $set: {workToday: false, area:"0"} };
    await MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("helpHend");
        await dbo.collection("users").updateMany(myquery, newvalues,  async function(err, result) {
          if (err) throw err; 
       
        await dbo.collection("daily-distribution").find({}).toArray(async function(err, result) {
          if (err) throw err;
          lst.push(...result); 
          for(let i=0;i<lst.length;i++){
            if(lst[i].finished===true)
            countYes++;
            else
            countNo++;
          }
          myInsert= {date:new Date() ,distributed:countYes ,not_distributed:countNo}
          console.log(myInsert)
          var x = await dbo.collection("statistics").insertOne(myInsert);
          var x = await dbo.collection("daily-distribution").deleteMany({});
          await db.close();
        });
      }); 
      });

  }catch{
      console.log("error")

  }

}) 






module.exports = router;