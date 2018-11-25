// Let's open a Mongo DB!
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/gavpass";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

    if (err) throw err;
    var dbo = db.db("gavpass");

    dbo.createCollection("user", function (err, res) {
        if (err) throw err;
        console.log("Collection user created");
    });

    var myobj = { name: "admin@tuttomail.com", pwd: "@@", phone: "", accountType: -1 };
    dbo.collection("user").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log(res.result.n + " user inserted");
    });

    dbo.createCollection("categories", function (err, res) {
        if (err) throw err;
        console.log("Collection categories created");
    });

    var categories = [
        { name: 'Email'},
        { name: 'Business'},
        { name: 'Education'},
        { name: 'Games'},
        { name: 'Entertainment'},
        { name: 'Shopping'},
        { name: 'Social'}
      ];

      dbo.collection("categories").insertMany(categories, function(err, res) {
        if (err) throw err;
        console.log("Number of categories inserted: " + res.insertedCount);
      });

    db.close();
});