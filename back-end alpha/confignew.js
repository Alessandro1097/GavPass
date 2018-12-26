// Let's open a Mongo DB!
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/gavpass";

MongoClient.connect(url, function (err, db) {

    if (err) throw err;
    var dbo = db.db("gavpass");

    dbo.createCollection("categories", function (err, res) {
        if (err) throw err;
        console.log("Collection categories created");
    });

    dbo.createCollection("attributes", function (err, res) {
        if (err) throw err;
        console.log("Collection attributes created");
    });
    
    var categories = [
        {
            name: 'Email'
        },
        {
            name: 'Anndrea'
        }
    ];

    var attributes = [
        {
            category: "Email",
            site: "Libero",
            url: "https://www.libero.it/"
        },
        {
            category: "Email",
            site: "Gmail",
            url: "https://www.gmail.com/"
        }
    ];

    dbo.collection("categories").insertMany(categories, function(err, res) {
        if (err) throw err;
        console.log("Number of categories inserted: " + res.insertedCount);
    });

    dbo.collection("attributes").insertMany(attributes, function(err, res) {
        if (err) throw err;
        console.log("Number of attributes inserted: " + res.insertedCount);
    });

    db.close();
});