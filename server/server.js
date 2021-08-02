import express from 'express'
const app = express()



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