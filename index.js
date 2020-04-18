//Main Startiing pint of the Application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
//App Setup
app.use(morgan("combined"));
//morgan is a logging framework
app.use(bodyParser.json({ type: "*/*" }));
//any request that is incomming will be parsed as json

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("server listening on port", port);
