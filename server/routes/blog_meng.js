const Blog = require('../../models/blogs');
const express = require('express');
var router = express.Router();
// const bcrypt=require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"

router.post('/addNewBlog',async function(req, res,next) {
    try{
      console.log("in adding new post")
        var blog=[];
        blog[0]= req.body.title;
        blog[1] = req.body.content;
        blog[2] = req.body.userEmail;
        blog[3]=req.body.creationTime;
        console.log(blog);
        Blog.CREATE(blog, (err, item) => {
          if (err) {
            console.log(err);
        }
        else {
          console.log('blog created:' + blog);
            
        }
      });
        
        setTimeout(() => { res.json({
          status: 'success',
          data:'true',
          message:"success"
        }); }, 1000); 
    
   }
   catch{
       res.status(500).send();
     }
  });
  
   
  module.exports = router;
