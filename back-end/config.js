// Let's open a Mongo DB!
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/gavpass";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

    if (err) throw err;
    var dbo = db.db("gavpass");

    // Create a collection
    dbo.createCollection("user", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});