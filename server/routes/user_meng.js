const User = require('../../models')("users");
const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
 
 


 router.post('/addNewUser',async function(req, res,next) {
  try{
    var user=[];
    user[0]= req.body.fname;
    user[1]= req.body.lname;
    user[2] = req.body.address;
    user[3] = req.body.age;
    user[4] = req.body.salery;
    user[5] =req.body.phone_number;
    user[6] =req.body.email;
    user[7] = await bcrypt.hash( req.body.password,10);
    user[8] = req.body.type;
    user[9] = "1";//status
   (async()=>{ await MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo =  db.db("helpHend");
      dbo.collection("users").find({email: user[6]},{ projection: { email: user[6]} }).toArray( function(err, result) {
        if (err) throw err;
        if(result.length!=0)
    {
      setTimeout(() => { res.json({
        status: 'failed',
        data:'false',
        message:"This email is already exist"
      }); }, 1000);
     
    }
    else{
         User.CREATE(user);
        console.log('User created:' + user);
        setTimeout(() => { res.json({
          status: 'success',
          data:'true',
          message:"success"
        }); }, 1000);       
    } 
        db.close();
      });

    });
  })();
    
    
    }catch{
      res.status(500).send();
    }

});

router.post('/updetUser',async function(req, res,next) {
try{
  console.log(req.body)
  var user={
  type: req.body.type,
  fname: req.body.fname,
  lname: req.body.lname,
  address: req.body.address,
  salery:req.body.salery,
  age:req.body.age,
  phone_number: req.body.phone_number,
  email: req.body.email,
  password: req.body.password,
  status : req.body.status,
  };
    console.log(user)
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("helpHend");
      var myquery = { email: req.body.email };
      var newvalues = { $set: user};
      dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
  
  });

}
  catch{
    res.status(500).send();
  }

});

router.post('/deleteUser',async function(req, res,next) {
  try{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("helpHend");
    var myquery = { email: req.body.email, status: "1" };
    var newvalues = { $set: {status: "0"} };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  
}
catch{
  setTimeout( () => {res.json({
    status: 'faild',
    data:'false',
    message:"something wrong happend in the server try again letter"
  });}, 1000);

}
});


module.exports = router;