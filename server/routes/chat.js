const express = require('express');
var router = express.Router();
//const Message = require('../../models/chat');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

//var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"

mongoose.connect(url , (err) => { 
    console.log('mongodb connected',err);
 })
var Message = mongoose.model('Message',{ name : String, message : String})

var http = require('http').Server(router);
var io = require('socket.io')(http);

io.on('connection', () =>{
    console.log("a user is connected")
   });

   router.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })

router.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      io.emit('message', req.body);
      res.sendStatus(200);
    })
  })

  module.exports = router;