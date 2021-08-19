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
    const lst = [
        {address: "1", lat: 31, lng: 35, id: 1,  finished: false},
        {address: "2", lat: 32, lng: 35, id: 2,  finished: false},
        {address: "3", lat: 31, lng: 34, id: 3,  finished: false},
        {address: "4", lat: 31.5, lng: 34.5, id: 4, finished: false}
    ];
   
  // Create the data 2D-array (vectors) describing the data
  let vectors = new Array();
  for (let i = 0 ; i < lst.length ; i++) {
    vectors[i] = [ lst[i]['lat'] , lst[i]['lng']];
  }
   
  const kmeans = require('node-kmeans');
  kmeans.clusterize(vectors, {k: 3}, (err,result) => {
    if (err) console.error(err);
    else console.log('%o',result);
    res.json(result);
  });
  
});

router.get('/bla', function(req, res, next) {
    try{
    var addresses=new Array();
    //var users = req.body.users;
    //var len=users.length;
    let vectors = new Array();

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("helpHend");
        dbo.collection("addresses-for-distribution").find({}).toArray(function(err, result) {
          if (err) throw err; 
        addresses.push(result);
        console.log("bla"+addresses.length)
        db.close();
        });
    });

    for (let i = 0 ; i < addresses.length ; i++) {
        vectors[i] = [addresses[i].lat , addresses[i].lng];
        
    }
    var DivByDatelist=[]  
    console.log("bla"+addresses.length)
    if(addresses.length>0){
        console.log("1")
        kmeans.clusterize(vectors,{k: 1 }, (err,result) => {
            if (err){
               console.log(err)
              
            }
        console.log("2")    
        for (let i = 0 ; i < 1 ; i++) {
            let a=[];
            let vectorsBit=[];     
            for(let j = 0 ; j < result[i].clusterInd.length ; j++)
            {
               a.push(addresses[result[i].clusterInd[j]]._id)
               vectorsBit[j]=0;
            }
            console.log("3")
            let userByAdd=
            {
            //"date":new Date("2021-08-11T21:00:00.000+00:00"),
            "userId":"11111",
            "addressesBit":vectorsBit,
            "addresses":a
            }
            DivByDatelist.push(userByAdd);
            console.log("4")
        }

        });
    }
    res.json(DivByDatelist)

 } catch(e){
       console.log(e)
    }
 });






module.exports = router;