const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();



const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors())


const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src')));


const login = require("./routes/login");
app.use("", login);

const blog_meng = require("./routes/blog_meng");
app.use("", blog_meng);

const daily_meng = require("./routes/dailyDeliv_meng");
app.use("", daily_meng);

const dbs = require("./routes/dbs");
app.use("", dbs);

const user_meng = require("./routes/user_meng");
app.use("", user_meng);

const clusterAlg = require("./routes/clusterAlg");
app.use("", clusterAlg);

const chat = require("./routes/chat");
app.use("", chat);

const address_meng = require("./routes/address_meng");
app.use("", address_meng);

const satistic_meng = require("./routes/satistic_meng");
app.use("", satistic_meng);

const initialization = require("./routes/initialization");
app.use("", initialization);

app.listen(PORT, () => {
    console.log(`Server listening on 111 ${PORT}`);
});

