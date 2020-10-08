//Dependencies 
const fs = require("fs"); 
const uuid = require("uuid");


module.exports = function(app) {

    //GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
    app.get("/api/notes", (req, res) => {
        return res.json(JSON.parse(fs.readFileSync("./db/db.json", "utf-8")));
    });
  
  
    //POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post("/api/notes", (req, res) => {
        
        //new note //req.body?
        const newNote = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
        console.log(newNote);
    
        newNote.push ({
        //unique id
        id: uuid(),
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        title: req.body.title,
        text: req.body.text
        });
        //return to client - convert JSON stringify
        fs.writeFileSync("./db/db.json", JSON.stringify(newNote));
        //return to user
        res.json(true);
    });
  
    //DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    app.delete("/api/notes/:id", (req, res) => {
        const newNote = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
        
        const printNote = newNote.filter(note => note.id !== req.params.id);
        fs.writeFileSync("./db/db.json", JSON.stringify(printNote));
        res.json(true);
    
    });
}