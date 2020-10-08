//List needed Dependencies 

const express = require("express");
const path = require("path");
const fs = require("fs");

//https://www.npmjs.com/package/uuid 
const uuid = require("uuid");


const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "public"));


//requiring in api and html from routing
require("./routing/api")(app); 
require("./routing/html")(app);



app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
  });