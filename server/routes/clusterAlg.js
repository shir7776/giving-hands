const DD = require('../../models/dailyDist');
const AFD = require('../../models/addressForDistr');
const express = require('express');
var router = express.Router();
// const bcrypt=require('bcrypt');
const kmeans = require('node-kmeans');

var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"

const help=async(users)=>{
   for(let i=0;i<users.length;i++){
      await MongoClient.connect(url, async function(err, db) {
         if (err) throw err;
         var dbo = db.db("helpHend");
      var myquery ={_id:mongoose.Types.ObjectId(users[i]._id)}
      var newvalues={$set:{workToday:true}}
      await dbo.collection("users").updateOne(myquery, newvalues, async function(err, result) {
         if (err) throw err;
         console.log("bbbbb")
         await db.close();
      });
      
    });
   }
}

router.post('/clusterAlg', async function(req, res, next) {
    try{
    var addresses=req.body.addresses;
    var users = req.body.users;
    let vectors = new Array();
    let numberArea=1;
    for (let i = 0 ; i < addresses.length ; i++) {
        vectors[i] = [addresses[i].lat , addresses[i].lng];
        
    }
    var DivByDatelist=[]  
    if(addresses.length>users.length){
       await kmeans.clusterize(vectors,{k: users.length }, async (err,result) => {
            if (err){
               throw err;
              
            }   
        for (let i = 0 ; i < users.length ; i++) {
            let a=[];
            let lngLat=[];
            let vectorsBit=[];     
            for(let j = 0 ; j < result[i].clusterInd.length ; j++)
            {
               a.push(addresses[result[i].clusterInd[j]].address)
               lngLat.push([addresses[result[i].clusterInd[j]].lat,addresses[result[i].clusterInd[j]].lng])
               vectorsBit[j]=0;
            }
            for(let j=0;j<a.length;j++){
               let userByAdd={
                  "id_user":"",
                  "area":String(numberArea),
                  "name_addr":a[j],
                  "finished":false,
                  "lat":lngLat[j][0],
                  "lng":lngLat[j][1]
               }
               DivByDatelist.push(userByAdd);

            }
            numberArea++;
        }
        numberArea=numberArea-1;
        
        await MongoClient.connect(url, async function(err, db) {
         if (err) throw err;
         var dbo = db.db("helpHend");
         var x = await dbo.collection("daily-distribution").deleteMany({});
         console.log("in deleting")
         var x = await dbo.collection("daily-distribution").insertMany(DivByDatelist);
         console.log("in inser")
         await dbo.collection("users").updateMany({workToday:true,type:"giver"},{$set:{workToday:false}},
          async function(err, result) {
            if (err) 
               throw err;
            console.log("in update many")
            await help(users);
            await db.close();
          }); 
       });
      
      
      
   });
res.send(true);
}
else{
res.send(false)
}
}catch(e){
       res.send(false);
    }
 });






module.exports = router;