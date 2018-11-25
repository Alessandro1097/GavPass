// Install Express
// npm install --save express mongodb@2.2.16 body-parser

// Call the packages needed
var express = require('express');        // Call express
var app     = express();                 // Define app using Express

// Configure app to use bodyParser() 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to get the DATA from a post

var port = process.env.PORT || 312;        // Set the port
var router = express.Router();             // Get an instance of the Express Router

router.get('/', function(req, res) {
    res.json({ message: 'Fucking APIs!' });   
});

// MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/gavpass";
var glob_categories;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("gavpass");

    dbo.collection("categories").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        glob_categories = result;
        db.close();
    });
});

router.get('/categories', function(req, res) {
    var myJSONobject = JSON.stringify(glob_categories);
    res.json(myJSONobject);
});

// Register the router
app.use('/api', router);

app.listen(port);

// Timeout 30 secs
console.log('Connected on port ' + port);
setTimeout( function () {
    console.error("Bye");
    process.exit(1); 
  }, 15*1000);

// server.close();