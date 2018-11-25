// Install Express
// npm install --save express mongodb@2.2.16 body-parser

// Call the packages needed
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// Configure app to use bodyParser() 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to get the DATA from a post

var port = process.env.PORT || 312;        // Set the port
var router = express.Router();              // Get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Fucking APIs!' });   
});

router.get('/Categories', function(req, res) {

    var obj = { name: "John", age: 30, city: "New York" };
    var myJSONobject = JSON.stringify(obj);

    var arr = [ "Email", "Business", "Education", "Games", "Entertainment", "Shopping", "Social" ];
    var myJSONarray = JSON.stringify(arr);

    res.json(myJSONarray);   // { message: 'CIAO' }
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