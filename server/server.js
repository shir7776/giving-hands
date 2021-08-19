// import express from 'express'
const express = require('express');


const app = express()
const path = require('path');
//const app = express();
app.use(express.json("li"));
//app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src')));

const login=require("./routes/login");
app.use("",login);

const blog_meng=require("./routes/blog_meng");
app.use("",blog_meng);

const daily_meng=require("./routes/dailyDeliv_meng");
app.use("",daily_meng);

const dbs=require("./routes/dbs");
app.use("",dbs);

const user_meng=require("./routes/user_meng");
app.use("",user_meng);

const clusterAlg=require("./routes/clusterAlg");
app.use("",clusterAlg);

app.get('/', function(req, res) {
    res.sendFile("index.js");
    
  });


app.listen(5000)