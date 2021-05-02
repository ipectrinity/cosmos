//jshint esversion: 6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("index.ejs");
});

app.get("/facts", function(req, res){
  res.render("facts.ejs");
});

app.get("/stories", function(req, res){
  res.render("stories.ejs");
});

app.get("/nearyou", function(req, res){
  res.render("nearyou.ejs");
});

app.get("/ngos", function(req, res){
  res.render("ngos.ejs");
});

app.get("/signup", function(req, res){
  res.render("signup.ejs");
});

app.post("/signup", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const emailId = req.body.emailId;

  const data = {
    members: [
      {
        email_address: emailId,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/4297802829";

  const options = {
    method: "POST",
    auth: "tarun0:d64c2c125bd689b61cdbbab052a4ad20-us7"
  };

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.render("/success");
    }
    else{
      res.render("/failure");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/signup");
});

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("website is ready...");
});

//mailchimp

//API KEY
//d64c2c125bd689b61cdbbab052a4ad20-us7

//LIST ID
//4297802829
