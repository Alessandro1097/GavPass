// Call the packages needed
const express = require('express');                         // Call Express
const app = express();                                      // Define app using Express
const cors = require('cors');                               // Call Cors
var mongoose = require('mongoose');                         // Call Mongoose
const bodyParser = require('body-parser');                  // Call BodyParser
const errorHandler = require('./_helpers/error-handler');   // Call the Error Handler

// Configure app to use bodyParser()
app.use(bodyParser.json()); // to get the DATA from a post
app.use(bodyParser.urlencoded({ extended: true }));

// Configure app to use Cors()
app.use(cors());
app.options('*', cors());
app.set('view engine', 'ejs');

// Global error handler
app.use(errorHandler);

// Connect to MongoDB using Mongoose
var dbConnection = require('./config/dbConnection');
mongoose.connect(dbConnection.getDbConnectionString());

// Run the API
var apiController = require('./api/apiController');
apiController(app);

// Run the app on the port
var port = process.env.PORT || 3000;

const server = app.listen(port, function () {
    console.log('Back-end server listening on port ' + port);
});