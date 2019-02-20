const express = require("express");
const routes = require("./routes/");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const helmet = require("helmet");
// const proxy = require("http-proxy-middleware");

const app = express();
const router = express.Router();
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/woca";

try {
  mongoose.connect(url, {
    //   useMongoClient: true
  });
} catch (error) {}

let port = 5000 || process.env.PORT;
routes(router);

app.use(bodyParser.json());

// var proxySettings = proxy({ target: "http://localhost:5000/" });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Party began at ${port}`);
});
