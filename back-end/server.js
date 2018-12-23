// Install Express
// npm install --save express mongodb@2.2.16 body-parser

// Call the packages needed
const cors = require('cors');        // Call cors
const express = require('express');  // Call express
let app = express();                 // Define app using Express

// Configure app to use bodyParser()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to get the DATA from a post

app.use(cors());

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });

    next();
});

var port = process.env.PORT || 312;        // Set the port
var router = express.Router();             // Get an instance of the Express Router

<<<<<<< HEAD
router.get('/', function (req, res) {
    res.json({ message: 'Fucking APIs!' });
=======
router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json("API OK");
>>>>>>> d1f12f7437d28d23173d655cd06ca8524438ff5a
});

// MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/gavpass";
var glob_categories, glob_users, glob_categories_id, test;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("gavpass");

<<<<<<< HEAD
    dbo.collection("categories").find({}).toArray(function (err, result) {
=======
    dbo.collection("categories").find().toArray(function(err, result) {
>>>>>>> d1f12f7437d28d23173d655cd06ca8524438ff5a
        if (err) throw err;
        glob_categories = result;
    });

<<<<<<< HEAD
    dbo.collection("users").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        glob_users = result;
        db.close();
    });
});

router.get('/categories', function (req, res) {
    var myJSONobject = JSON.stringify(glob_categories);
    res.json(myJSONobject);
=======
    dbo.collection("categories").findOne({}, function(err, result) {
      if (err) throw err;
      glob_categories_id = result;
      console.log(result);
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

router.get('/categories/:id', function(req, res) {
  //var myJSONobject = JSON.stringify(glob_categories);
  console.log("Inside the id categories");
  res.json(glob_categories_id);
>>>>>>> d1f12f7437d28d23173d655cd06ca8524438ff5a
});

router.get('/active_users', function (req, res) {
    var myJSONobject = JSON.stringify(glob_users);
    res.json(myJSONobject);
});

// Register the router
app.use('/api', router);

app.listen(port);

// Timeout 60 secs
<<<<<<< HEAD
console.log('Connected on port ' + port);
setTimeout(function () {
    console.error("Bye");
    process.exit(1);
}, 60 * 1000);
=======
//console.log('Connected on port ' + port);
//setTimeout( function () {
//    console.error("Bye");
//    process.exit(1);
//  }, 1000*1000);
>>>>>>> d1f12f7437d28d23173d655cd06ca8524438ff5a

// server.close();

function userAdd(email, pwd, phone, accountType) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gavpass");
<<<<<<< HEAD

=======
>>>>>>> d1f12f7437d28d23173d655cd06ca8524438ff5a
        // Insert 1 document
        var myobj = { email: email, pwd: pwd, phone: phone, accountType: accountType };
        dbo.collection("users").insertOne(myobj, function (err, res) {
            if (err) throw err;
            if (res.result.n == 1) return true;
        });
<<<<<<< HEAD

        db.close();
        return false;
    });
}
=======
        db.close();
        return false;
    });
  }
>>>>>>> d1f12f7437d28d23173d655cd06ca8524438ff5a
