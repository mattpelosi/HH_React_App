const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongo = require("./mongodb");
const dotenv = require("dotenv");

dotenv.config({path:`/sf.code/helpful-human-new-clone/Helpful_Human_Interview_Challenge/server/.env`});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://hh-interview-challenge-mp.herokuapp.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("withCredentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cookie, x-access-token"
  );
  next();
});

app.use(routes);

mongo
  .connect(process.env.MONGODB_URL)
  .then(app.listen(8080))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

console.log("server listening on port 8080");
