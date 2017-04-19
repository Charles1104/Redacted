/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

let blacklistWords = {
"selfie" : "self-portrait",
"yummers" : "delicious",
"outchea" : "are out here",
"bruh" : "wow",
"doge" : "pug",
"cilantro" : "soap",
"bae" : "loved one",
"swag" : "style",
"yolo" : "carpe diem",
};

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
  let sentence = req.body.sentence.toLowerCase().replace(/[^\w\s]|_/gi, "").replace(/\s+/gi, " ");
  let words = sentence.split(" ");
  for (let i = 0; i <= words.length; i++){
    if(blacklistWords[words[i]] !== undefined){
      words[i] = blacklistWords[words[i]];
    }
  }
  res.sentence = words.join(" ");
  next();
});

app.post("/", (req, res) => {
  res.send(res.sentence);
});

var server = app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});

