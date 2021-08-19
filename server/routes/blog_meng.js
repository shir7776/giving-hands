const Blog = require('../../models/blogs');
const express = require('express');
var router = express.Router();
// const bcrypt=require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"

router.post('/addNewBlog',async function(req, res,next) {
    try{
        var blog=[];
        blog[0]= req.body.id_blog;
        blog[1]= req.body.title;
        blog[2] = req.body.content;
        blog[3] = req.body.email;
   MongoClient.connect(url, function(err, db) {
       if (err) throw err;
       var dbo = db.db("helpHend");
       var myquery = {id_blog:req.body.id_blog};
       dbo.collection("blogs").find({myquery}).toArray(function(err, result) {
        if (err) throw err;
        if(result.length!=0){
            setTimeout(() => { res.json({
                status: 'failed',
                data:'false',
                message:"This id_blog is already exist"
              }); }, 1000);
      }
      else{
        Blog.CREATE(blog);
        console.log('blog created:' + blog);
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
  
   
  module.exports = router;
