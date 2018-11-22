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
    });

    // Insert 1 document
    var myobj = { name: "admin@tuttomail.com", pwd: "@@", phone: "", accountType: -1 };
    dbo.collection("user").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log(res.result.n + " document inserted");
    });

    // Read record.name
    dbo.collection("user").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result.name);
    });

    var myquery = { name: 'admin@tuttomail.com' };
    dbo.collection("user").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log(obj.deletedCount + " document deleted");
        db.close();
    });
});