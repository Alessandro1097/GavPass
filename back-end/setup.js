var collection = require('./models/User');

module.exports = function (app) {

  app.get('/api/setupGavpass', function (req, res) {

    // TODO - It must be available only for an admin

    var recordset = [
      {
        email: "master",
        psw: "master",
        phone: "330212182",
        accountType: 99
      },
      {
        email: "andrea@tuttomail.com",
        psw: "andrea",
        phone: "330212182",
        accountType: 0
      }
    ];

    collection.create(recordset, function (err, results) {
      res.send(results);
    });
  });

  // Find by Name
  app.get('/api/setup/login/:email', function (req, res) {

    // Create a setup
    var tmpSetup = new collection ({
      email: "dd@tuttomail.com",
      psw: "simone",
      phone: "123",
      accountType: 0
    });

    tmpSetup.save(function (err) {

        if (err) throw err;

        collection.findOne({ email: 'master' }, function (err, result) {

            if (err) throw err;

            var esito = "";

            // test a matching password
            result.comparePassword('Password123', function (err, isMatch) {
                if (err) throw err;
                esito = isMatch; // -&gt; Password123: true
            });

            // test a failing password
            result.comparePassword('123Password', function (err, isMatch) {
                if (err) throw err;
                esito = isMatch; // -&gt; Password123: true
            });

            res.send(result + " con esito: " + esito);
        })
    });
});
};