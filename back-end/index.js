// Call the packages needed
const cors = require('cors');        // Call Cors
const express = require('express');  // Call Express
var mongoose = require('mongoose');  // Call Mongoose
var app = express();                 // Define app using Express

// Configure app to use bodyParser()
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to get the DATA from a post
app.use(bodyParser.urlencoded({ extended: true }));

// Configure app to use Cors()
app.use(cors());
app.options('*', cors());
app.set('view engine', 'ejs');

// Connect to MongoDB using Mongoose
var dbConnection = require('./config/dbConnection');
mongoose.connect(dbConnection.getDbConnectionString());

// Run the API
var apiController = require('./api/ApiController');
apiController(app);

// Run the app on the port
var port = process.env.PORT || 3000;
app.listen(port);