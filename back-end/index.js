// Call the packages needed
const express = require('express');         // Call Express
const app = express();                      // Define app using Express
const cors = require('cors');               // Call Cors
var mongoose = require('mongoose');         // Call Mongoose
const bodyParser = require('body-parser');  // Call BodyParser

// FIXME - Call the helpers
const jwt = require('jwt/jwt');
const errorHandler = require('jwt/error-handler');

// Configure app to use bodyParser()
app.use(bodyParser.json()); // to get the DATA from a post
app.use(bodyParser.urlencoded({ extended: true }));

// Configure app to use Cors()
app.use(cors());
app.options('*', cors());
app.set('view engine', 'ejs');


// FIXME - Start JTW
// Use JWT auth to secure the API
app.use(jwt());

// API routes
// app.use('/jonnyampuero', require('./jwt/users/users.controller'));

// global error handler
app.use(errorHandler);
// FIXME - End JTW




// Connect to MongoDB using Mongoose
var dbConnection = require('./config/dbConnection');
mongoose.connect(dbConnection.getDbConnectionString());

// Run the API
var apiController = require('./api/ApiController');
apiController(app);

// Run the app on the port
var port = process.env.PORT || 3000;

const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});