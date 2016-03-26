var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var favicon = require('serve-favicon');
var Datastore = require("nedb");
var db = new Datastore({filename: "./emaildb.db"});

db.loadDatabase();

app.use(bodyParser.urlencoded({extended:false}));
app.use(favicon(__dirname+"/public/favicon.ico"))
app.use(express.static("public"));

app.get('/', function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var email = req.body.email;
  console.log(email);
  var doc = {email: email};
  db.insert(doc);
  res.end("Email Saved");
});

app.listen(3000,function(){
  console.log("Example app listening on port 3000!");
});
