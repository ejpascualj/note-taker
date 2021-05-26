// DEPENDENCIES
const fs = require('fs');
// unique id: uuid https://www.npmjs.com/package/uuid
const {v4: uuidv4} = require('uuid');


// LOAD DATA
// Require() vs. fs.readFileSync: https://dev.to/tejesh/nodejs-read-json-file-using-require-vs-fs-module-4f94#:~:text=If%20the%20JSON%20file%20is,have%20to%20be%20re%2Dfetched.
// In this case, 'fs.readFileSync' is better because the json file changes as new notes are added.
let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))

// HELP NEEDED!!!!
// ROUTING: https://laravel-json-api.readthedocs.io/en/latest/basics/routing/
module.exports = (app) => {
    // API GET Request
    app.get('/api/notes', (req, res) => res.json(data));

    // API POST Request
    app.post('/api/notes', (req, res) => {
        // receive a new note to save on the request body and unique id
        const newNote = request.body;
        newNote.id = uuidv4();

        // add new note to the db.json file
        // source??
        data.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data));

        //  then return the new note to the client.
        // should it use 'send()' or 'json()'?? should it sent back data or true??
        // https://www.tutorialspoint.com/difference-between-res-send-and-res-json-in-express-js#:~:text=send%20function%20sets%20the%20content,as%20a%20valid%20JSON%20object.
        res.json(data);

    });

    // API DELETE Request (OPTIONAL)
    // https://www.codota.com/code/javascript/functions/express/Express/delete
    app.delete('/api/notes/:id', (req, res) => {
        // receive a query parameter containing the id of a note to delete
        let id = req.params.id.toString();
        // In order to delete a note, you’ll need to read all notes from the db.json file
        // https://stackoverflow.com/questions/38727295/should-i-use-delete-and-findindex-or-filter-to-remove-and-item-from-an-immutable
        // https://www.codota.com/code/javascript/functions/express/Express/delete
        const index = data.findIndex(p => p.id == id);

        // remove the note with the given id property 
        data.splice(index,1);

        // then rewrite the notes to the db.json file.
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        res.json(data);
    });
};



