const BLOG = require('../../models/blogs.js');
const express = require('express');
var router = express.Router();
// const bcrypt=require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
//var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend";

router.post('/addNewBlog',async function(req, res,next) {
    try{
      console.log("in adding new post")
        var blog=[];
        blog[0]= req.body.title;
        blog[1] = req.body.content;
        blog[2] = req.body.userEmail;
        blog[3]=req.body.creationTime;
        console.log(blog);
        await MongoClient.connect(url, async function(err, db) {
          if (err) throw err;
          console.log("1");
          var dbo = db.db("helpHend");
          var myInsert ={title:req.body.title, content:req.body.content,userEmail:req.body.userEmail,creationTime:req.body.creationTime }
          console.log("2");
          var x = await dbo.collection("blogs").insertOne(myInsert);
          await db.close();
        });
        console.log("3");
    
   }
   catch{
       res.status(500).send();
     }
  });
  
   
  module.exports = router;
