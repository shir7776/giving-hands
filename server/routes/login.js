const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');


var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
//var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend";


router.post('/login',async function(req, res) {
     try{
       var email = req.body.email;
       var password = req.body.password;
       if (email!="" && password!="") {
          if (email.length > 0 && password.length > 0) {
             MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("helpHend");
            var myQray={email:email};
            dbo.collection("users").find(myQray).toArray(async function(err, result) {
              if (err) throw err;
              var flag=false;
              await bcrypt.compare(password, result[0].password).then(function(result2) {
                if(result!==null&& result2){
                  res.json({
                    status: 'success',
                    data:'true',
                    type:result[0].type,
                    fname:result[0].fname,
                    lname:result[0].lname
                  });
                }
                else{
                 res.json({
                   status: 'faild',
                   data:'false'});
                }  
            });
              
               db.close();
            });
          });
        }
        else{
          res.json({
            status: 'faild',
            data:'false'});
        }
      }
      else{
      res.json({
        status: 'faild',
        data:'false'});
      }
    }catch{
      res.status(500).send();
    }
  
  });






 

module.exports=router;