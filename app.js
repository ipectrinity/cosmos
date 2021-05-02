//jshint esversion: 6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
let userData = [];

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

app.get("/ngos", function(req, res){
  res.render("ngos.ejs");
});

app.get("/signup", function(req, res){
  res.render("signup.ejs");
});

app.get("/success", function(req, res){
  res.render("success.ejs");
});

app.post("/success", function(req, res){
  res.redirect("/");
})

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

  userData.push(data);

  res.redirect("/success");

});


app.listen(process.env.PORT || 3000, function(req, res){
  console.log("website is ready...");
});

//mailchimp

//API KEY
//d64c2c125bd689b61cdbbab052a4ad20-us7

//LIST ID
//4297802829
