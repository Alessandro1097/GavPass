// Install Express
// npm install --save express mongodb@2.2.16 body-parser

// Call the packages needed
const express = require('express');  // Call express
const cors = require('cors');        // Call cors
let app = express();                 // Define app using Express

// Configure app to use bodyParser() 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to get the DATA from a post

app.use(cors());

var port = process.env.PORT || 312;        // Set the port
var router = express.Router();             // Get an instance of the Express Router

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json("API OK");
});

// MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/gavpass";
var glob_categories, glob_users;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("gavpass");

    dbo.collection("categories").find({}).toArray(function(err, result) {
        if (err) throw err;
        glob_categories = result;
    });

    dbo.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;
        glob_users = result;
        db.close();
    });
});

router.get('/categories', function(req, res) {
    //var myJSONobject = JSON.stringify(glob_categories);
    res.json(glob_categories);
});

router.get('/active_users', function(req, res) {
    var myJSONobject = JSON.stringify(glob_users);
    res.json(myJSONobject);
});

// Register the router
app.use('/api', router);

app.listen(port);

// Timeout 60 secs
//console.log('Connected on port ' + port);
//setTimeout( function () {
//    console.error("Bye");
//    process.exit(1);
//  }, 1000*1000);

// server.close();

  function userAdd(email, pwd, phone, accountType) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

        if (err) throw err;
        var dbo = db.db("gavpass");
    
        // Insert 1 document
        var myobj = { email: email, pwd: pwd, phone: phone, accountType: accountType };
        dbo.collection("users").insertOne(myobj, function (err, res) {
            if (err) throw err;
            if (res.result.n==1) return true;
        });
    
        db.close();
        return false;
    });
  }
