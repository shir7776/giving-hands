const DD = require('../../models/dailyDist');
const AFD = require('../../models/addressForDistr');
const express = require('express');
var router = express.Router();
// const bcrypt=require('bcrypt');
const kmeans = require('node-kmeans');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"



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
        kmeans.clusterize(vectors,{k: users.length }, async (err,result) => {
            if (err){
               console.log(err)
              
            }   
        for (let i = 0 ; i < users.length ; i++) {
            let a=[];
            let lngLat=[];
            let vectorsBit=[];     
            for(let j = 0 ; j < result[i].clusterInd.length ; j++)
            {
               a.push(addresses[result[i].clusterInd[j]]._id)
               lngLat.push([addresses[result[i].clusterInd[j]].lat,addresses[result[i].clusterInd[j]].lng])
               vectorsBit[j]=0;
            }
            for(let j=0;j<a.length;j++){
               let userByAdd={
                  "id_user":"",
                  "area":numberArea,
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
        console.log(DivByDatelist);
        await MongoClient.connect(url, async function(err, db) {
         if (err) throw err;
         console.log("1");
         var dbo = db.db("helpHend");
        console.log("2");
         var x = await dbo.collection("daily-distribution").insertMany(DivByDatelist);
         await db.close();
         res.json(numberArea);
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