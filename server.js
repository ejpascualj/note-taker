// Dependencies
const express = require('express');

// Express Configuration
const app = express();
const PORT = process.env.PORT || 8080;

// Set up Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// We are using this because css and js is a static asset and we're not calling them in the routes
app.use(express.static('public'));

// ROUTER -- points server to "route" files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


// LISTENER -- starts server
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})