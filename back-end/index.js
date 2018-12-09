var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/gavpass";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

    if (err) throw err;
    var dbo = db.db("gavpass");

    // Insert 1 document
    var myobj = { name: "admin@tuttomail.com", pwd: "@@", phone: "", accountType: -1 };
    dbo.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log(res.result.n + " document inserted");
    });

    // Read record.name
    dbo.collection("users").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result.name);
    });

    var myquery = { name: 'admin@tuttomail.com' };
    dbo.collection("users").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log(obj.deletedCount + " document deleted");
        db.close();
    });
});