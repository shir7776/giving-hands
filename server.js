//import express from 'express'
//const app = express()
const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3




const login=require("./routes/routes/login");
app.use("",login);

const blog_meng=require("./routes/routes/blog_meng");
app.use("",blog_meng);

const daily_meng=require("./routes/routes/dailyDeliv_meng");
app.use("",daily_meng);

const dbs=require("./routes/routes/dbs");
app.use("",dbs);

const user_meng=require("./routes/routes/user_meng");
app.use("",user_meng);

app.listen(port, () => console.log(`Listening on port ${port}`)); 