const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');
var nodemailer = require('nodemailer');


//need to creat a new data base....
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://shir123:shir123@flowercluster.e9nsj.mongodb.net/flowers";

//for login google
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy());




router.post('/login',async function(req, res) {
    try{
      var name = req.body.name;
      var password = req.body.password;
      if (name && password) {
        if (email.length > 0 && password.length > 0) {
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("flowers");
            dbo.collection("users").find({name:req.body.name}).toArray(function(err, result) {
              if (err) throw err;
              console.log(result[0]);
              if(result && bcrypt.compare(password,result[0].password)){
                 res.json({
                   status: 'success',
                   data:'true',
                   type:result[0].type,
                   first_name:result[0]['first-name'],
                   last_name:result[0]['last-name']
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