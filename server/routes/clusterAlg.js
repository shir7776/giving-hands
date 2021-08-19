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
  for (let i = 0 ; i < data.length ; i++) {
    vectors[i] = [ lst[i]['lat'] , lst[i]['lng']];
  }
   
  const kmeans = require('node-kmeans');
  kmeans.clusterize(vectors, {k: 2}, (err,result) => {
    if (err) console.error(err);
    else console.log('%o',result);
    res.json(result);
  });
  
});

router.post('/bla', function(req, res, next) {
    try{
    var addresses=req.body.addresses;
    var users=req.body.users;
    let vectors = new Array();
    
    for (let i = 0 ; i < addresses.length ; i++) {
       vectors[i] = [addresses[i].lat , addresses[i].lng];
       
   }
   if(addresses.length>users.length){
 
    kmeans.clusterize(vectors,{k: users.length }, (err,result) => {
       if (err){
          console.log(err)  
       }
       else {
       var DivByDatelist=[]         
          for (let i = 0 ; i < users.length ; i++) {
         
          let a=[];
          let vectorsBit=[];     
            for(let j = 0 ; j < result[i].clusterInd.length ; j++)
             {
                a.push(addresses[result[i].clusterInd[j]]._id)
                vectorsBit[j]=0;
             }
             let userByAdd=
            {
            //"date":new Date("2021-08-11T21:00:00.000+00:00"),
            "date":data.date,
            "settId":data.settId,
            "userId":users[i]._id,
            "addressesBit":vectorsBit,
            "addresses":a
            }
             DivByDatelist.push(userByAdd)
 
          }
          let query={
             "date":new Date("2021-08-11T21:00:00.000+00:00"),
            }
 
          divByDate.deleteMany(query, function(err, result) {
            {
             
                   divByDate.insertMany(DivByDatelist, function(err, result) {
                      if (err)
                      {
                         console.log("p2")
                         return               
                      }
                      else
                      {
                         res.send(true);
                      }
 
 
                   })
 
                }
 
 
 
          })
        
   
 
    }
 })
 }
 else{
    res.send(false)
 }
    }
 
 
    catch(e){
       console.log(e)
    }
 });






module.exports = router;