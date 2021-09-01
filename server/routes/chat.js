//
//
//
//
// const express = require('express');
// var router = express.Router();
// //const Message = require('../../models/chat');
// var mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;
//
// //var url = "mongodb+srv://hodayara:hodayara@giving-hands.e9nsj.mongodb.net/helpHend";
// var url ="mongodb+srv://hodayara:hodayara@giving-hands.cztzd.mongodb.net/helpHend?retryWrites=true&w=majority"
//
// mongoose.connect(url , (err) => {
//     console.log('mongodb connected',err);
//  })
// var Message = mongoose.model('Message',{ name : String, message : String})
//
// var http = require('http').Server(router);
// var io = require('socket.io')(http);
//
// io.on('connection', () =>{
//     console.log("a user is connected")
//    });
//
//    router.get('/messages', (req, res) => {
//     Message.find({},(err, messages)=> {
//       res.send(messages);
//     })
//   })
//
// router.post('/messages', (req, res) => {
//     var message = new Message(req.body);
//     message.save((err) =>{
//       if(err)
//         sendStatus(500);
//       io.emit('message', req.body);
//       res.sendStatus(200);
//     })
//   })
//
//   module.exports = router;

// Keep track of which names are used so that there are no duplicates
var userNames = (function () {
    var names = {};

    var claim = function (name) {
        if (!name || names[name]) {
            return false;
        } else {
            names[name] = true;
            return true;
        }
    };

    // find the lowest unused "guest" name and claim it
    var getGuestName = function () {
        var name,
            nextUserId = 1;

        do {
            name = 'Guest ' + nextUserId;
            nextUserId += 1;
        } while (!claim(name));

        return name;
    };

    // serialize claimed names as an array
    var get = function () {
        var res = [];
        for (user in names) {
            res.push(user);
        }

        return res;
    };

    var free = function (name) {
        if (names[name]) {
            delete names[name];
        }
    };

    return {
        claim: claim,
        free: free,
        get: get,
        getGuestName: getGuestName
    };
}());

// export function for listening to the socket
module.exports = function (socket) {
    var name = userNames.getGuestName();

    // send the new user their name and a list of users
    socket.emit('init', {
        name: name,
        users: userNames.get()
    });

    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', {
        name: name
    });

    // broadcast a user's message to other users
    socket.on('send:message', function (data) {
        socket.broadcast.emit('send:message', {
            user: name,
            text: data.text
        });
    });

    // validate a user's name change, and broadcast it on success
    socket.on('change:name', function (data, fn) {
        if (userNames.claim(data.name)) {
            var oldName = name;
            userNames.free(oldName);

            name = data.name;

            socket.broadcast.emit('change:name', {
                oldName: oldName,
                newName: name
            });

            fn(true);
        } else {
            fn(false);
        }
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
        socket.broadcast.emit('user:left', {
            name: name
        });
        userNames.free(name);
    });
};
