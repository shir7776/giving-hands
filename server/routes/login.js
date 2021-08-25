const express = require('express');
var router = express.Router();
// const bcrypt=require('bcrypt');




var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
//var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend";


//for login google
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.use(new GoogleStrategy());




router.post('/login',async function(req, res) {
     try{
       var email = req.body.email;
       var password = req.body.password;
       console.log("1")
       if (email!="" && password!="") {
        console.log("2")
          if (email.length > 0 && password.length > 0) {
            console.log("3")
             MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            console.log("4")
            var dbo = db.db("helpHend");
            var myQray={email:email};
            dbo.collection("users").find(myQray).toArray(function(err, result) {
              if (err) throw err;
              console.log("5")
              console.log(email);
              console.log(password);
              console.log(result[0]);
              if(password==result[0].password)
              console.log("==")
              else
              console.log("!=")
              if(result!=null&& password==result[0].password){
                 res.json({
                   status: 'success',
                   data:'true',
                   type:result[0].type
                 });
               }
               else{
                res.json({
                  status: 'faild',
                  data:'false'});
               }
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






  //
  // passport.use(new LocalStrategy(
  //   function(username, password, done) {
  //     User.findOne({ username: username }, function (err, user) {
  //       if (err) { return done(err); }
  //       if (!user) { return done(null, false); }
  //       if (!user.verifyPassword(password)) { return done(null, false); }
  //       return done(null, user);
  //     });
  //   }
  // ));
  // passport.serializeUser(function(user, done) {
  //   done(null, user.id);
  // });
  //
  // passport.deserializeUser(function(id, done) {
  //   User.findById(id, function (err, user) {
  //     done(err, user);
  //   });
  // });
  //
  

module.exports=router;