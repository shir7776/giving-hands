const User = require('../../models/users');
const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
//var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority" 
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend";

router.post('/initialization ',async function(req, res,next) {


});




module.exports = router;