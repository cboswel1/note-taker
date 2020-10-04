const { notStrictEqual } = require("assert");
//List needed Dependencies 

var express = require("express");
var path = require("path");
var fs = require("fs");



const app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//GET `/notes` - Should return the `notes.html` file.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(_dirname, "public/notes.html"));
});

//* GET `*` - Should return the `index.html` file
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "public/index.html"));
});

//GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  return res.json(JSON.parse(fs.readFileSync(".Develop/db/db.json", "utf-8")));
});

//POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
  
  //new note 
  const newNote = JSON.parse(fs.readFileSync(".Develop/db/db.json", "utf-8"));
  console.log(newNote);

  newNote.push ({
    id:?, //need unique id
    //// req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
    title: req.body.title,
    text: req.body.text
  });

});

//DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", (req, res) => {

});


app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
  });