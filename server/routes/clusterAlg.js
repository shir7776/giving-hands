const DD = require('../../models/dailyDist');
const AFD = require('../../models/addressForDistr');
const express = require('express');
var router = express.Router();
// const bcrypt=require('bcrypt');
const kmeans = require('node-kmeans');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"



router.get('/clusterAlg',async function(req, res,next) {
    var lstAddress=new Array();
    var lstlusters=req.body.clusters;
    var num = lstlusters.length;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("helpHend");
        dbo.collection("addresses-for-distribution").find({myquery}).toArray(function(err, result) {
          if (err) throw err;
          lstAddress.push(result);
        db.close();
        });
    });




});

router.get('/try',async function(req, res,next) {
const data = [
    {'company': 'Microsoft' , 'size': 91259, 'revenue': 60420},
    {'company': 'IBM' , 'size': 400000, 'revenue': 98787},
    {'company': 'Skype' , 'size': 700, 'revenue': 716},
    {'company': 'SAP' , 'size': 48000, 'revenue': 11567},
    {'company': 'Yahoo!' , 'size': 14000 , 'revenue': 6426 },
    {'company': 'eBay' , 'size': 15000, 'revenue': 8700},
  ];
   
  // Create the data 2D-array (vectors) describing the data
  let vectors = new Array();
  for (let i = 0 ; i < data.length ; i++) {
    vectors[i] = [ data[i]['size'] , data[i]['revenue']];
  }
   
  const kmeans = require('node-kmeans');
  kmeans.clusterize(vectors, {k: 4}, (err,result) => {
    if (err) console.error(err);
    else console.log('%o',result);
    res.json(result);
  });
  
});






module.exports = router;