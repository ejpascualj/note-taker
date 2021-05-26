// DEPENDENCIES
const fs = require('fs');
// unique id: uuid https://www.npmjs.com/package/uuid
const {v4: uuidv4} = require('uuid');

// HELP NEEDED!!!!
// ROUTING: https://laravel-json-api.readthedocs.io/en/latest/basics/routing/

module.exports = (app) => {
    // API GET Request
    app.get('/api/notes', (req, res) => {

    });

    // API POST Request
    app.post('/api/notes', (req, res) => {

    });

    // API DELETE Request (OPTIONAL)
    app.delete('/api/notes/:id', (req, res) => {

    });
};



