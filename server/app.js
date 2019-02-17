const express = require("express");
const routes = require("./routes/");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const proxy = require("http-proxy-middleware");

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

// app.use(cors());
app.use(bodyParser.json());
// app.use(helmet());

var proxySettings = proxy({ target: "http://localhost:5000/" });

app.use("/api", router);

app.listen(port, () => {
  console.log(`Party began at ${port}`);
});
