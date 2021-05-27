// DEPENDENCIES
// file-system
const fs = require("fs");
// (random) universal unique identifier
const { v4: uuidv4 } = require("uuid");

// ROUTING
module.exports = (app) => {
    // API GET Request
    app.get("/api/notes", async (req, res) => {
        // readfile has asynchronous behavior, use async-await
        let data = await JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
        res.json(data);
    });

    // API POST Request
    app.post("/api/notes", async (req, res) => {
        // receive a new note to save on the request body
        const newNote = req.body;

        // add unique id to newNote
        newNote.id = uuidv4();

        // add new note to the db.json file and store
        let data = await JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
        data.push(newNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(data));

        //  return the new note to the client.
        res.json(data);
    });

    // API DELETE Request
    app.delete("/api/notes/:id", async (req, res) => {
        // receive a query parameter containing the id of a note to delete
        let id = req.params.id;

        //  read all notes from the db.json file
        let data = await JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

        // remove the note with the given id property
        const newData = data.filter((elements) => elements.id !== id);

        // rewrite the notes to the db.json file and return to client.
        fs.writeFileSync("./db/db.json", JSON.stringify(newData));
        res.json(newData);
    });
};