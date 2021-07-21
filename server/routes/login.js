const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');




var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";

//for login google
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy());




router.post('/login',async function(req, res) {
    try{
      var email = req.body.email;
      var password = req.body.password;
      if (email && password) {
        if (email.length > 0 && password.length > 0) {
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("helpHend");
            dbo.collection("users").find({email:req.body.email}).toArray(function(err, result) {
              if (err) throw err;
              console.log(result[0]);
              if(result && bcrypt.compare(password,result[0].password)){
                 res.json({
                   status: 'success',
                   data:'true',
                   type:result[0].type,
                   first_name:result[0][fname],
                   last_name:result[0][lname]
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







  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  
  router.get('/', function(req, res) {
    res.render('index');
    
  });

module.exports=router;