const DD = require('../../models/dailyDist');
const AFD = require('../../models/addressForDistr');
const express = require('express');
var router = express.Router();
// const bcrypt=require('bcrypt');
const kmeans = require('node-kmeans');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"



router.get('/clusterAlg', function(req, res, next) {
    try{
    var addresses=req.body.address;
    var users = req.body.users;
    var date=req.body.date[0];
    let vectors = new Array();
    for (let i = 0 ; i < addresses.length ; i++) {
        vectors[i] = [addresses[i].lat , addresses[i].lng];
        
    }
    var DivByDatelist=[]  
    console.log("bla"+addresses.length)
    if(addresses.length>users.length){
        console.log("1")
        kmeans.clusterize(vectors,{k: users.length }, (err,result) => {
            if (err){
               console.log(err)
              
            }
        console.log("2")    
        for (let i = 0 ; i < users.length ; i++) {
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
            "date":req.body.date,
            "userId":users[_id],
            "addressesBit":vectorsBit,
            "addresses":a
            }
            DivByDatelist.push(userByAdd);
            console.log("4")
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
               });
            }
      });
});
}
else{
res.send(false)
}
}catch(e){
       console.log(e);
    }
 });






module.exports = router;