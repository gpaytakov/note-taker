const express = require('express');

const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

// heroku decides port or use default 3001
const PORT = process.env.PORT || 3003;

const app = express();

/* To serve static files such as images, CSS files, and JavaScript files, 
   use the express.static built-in middleware function in Express.*/
app.use(express.static('public'));

// takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object
app.use(express.urlencoded({extended: true}));

// takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object.
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// The app.listen() method binds itself with the specified host and port to bind and listen for any connections.
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}! Visit: http://localhost:${PORT}`);
})