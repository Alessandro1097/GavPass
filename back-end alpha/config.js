// Let's open a Mongo DB!
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/gavpass";

MongoClient.connect(url, function (err, db) {

    if (err) throw err;
    var dbo = db.db("gavpass");

    dbo.createCollection("users", function (err, res) {
        if (err) throw err;
        console.log("Collection users created");
    });

    var myobj = { name: "admin@tuttomail.com", pwd: "@@", phone: "", accountType: -1 };
    dbo.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log(res.result.n + " user inserted");
    });

    dbo.createCollection("categories", function (err, res) {
        if (err) throw err;
        console.log("Collection categories created");
    });

    var categories = [
        {
            name: 'Email',
            attributes: [
                {
                    site: "Libero",
                    url: "https://www.libero.it/"
                },
                {
                    site: "Gmail",
                    url: "https://www.gmail.com/"
                }
            ]
        },
        {
            name: 'Business',
            attributes: [
                {
                    site: "Trenitalia",
                    url: "https://www.trenitalia.com/"
                },
                {
                    site: "Trello",
                    url: "httpss://www.trello.com/"
                }
            ]
        },
        {
            name: 'Education',
            attributes: [
                {
                    site: "Coursera",
                    url: "https://www.coursera.org/"
                },
                {
                    site: "Udemy",
                    url: "https://www.udemy.com/"
                }
            ]
        },
        {
            name: 'Games',
            attributes: [
                {
                    site: "Hearthstone",
                    url: "https://www.playhearthstone.com/"
                },
                {
                    site: "Fifa",
                    url: "https://www.fifa.com/"
                }
            ]
        },
        {
            name: 'Entertainment',
            attributes: [
                {
                    site: "Netflix",
                    url: "https://www.netflix.com/"
                },
                {
                    site: "YouTube",
                    url: "https://www.youtube.com/"
                }
            ]
        },
        {
            name: 'Shopping',
            attributes: [
                {
                    site: "Zalando",
                    url: "https://www.zalando.it/"
                },
                {
                    site: "Amazon",
                    url: "https://www.amazon.it/"
                }
            ]
        },
        {
            name: 'Social',
            attributes: [
                {
                    site: "Facebook",
                    url: "https://it-it.facebook.com/"
                },
                {
                    site: "Instagram",
                    url: "https://www.instagram.com/"
                }
            ]
        }
      ];

  dbo.collection("categories").insertMany(categories, function(err, res) {
        if (err) throw err;
        console.log("Number of categories inserted: " + res.insertedCount);
      });

    db.close();
});
