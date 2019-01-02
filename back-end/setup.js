var collection = require('./models/User');
const Role = require('./models/Role');

module.exports = function (app) {

  app.get('/api/setupGavpass', function (req, res) {

    // TODO - It must be available only for an admin

    var recordset = [
      {
        email: "master",
        pwd: "master",
        phone: "330212182",
        role: Role.Admin
      },
      {
        email: "andrea@tuttomail.com",
        pwd: "andrea",
        phone: "330212182",
        role: Role.User
      }
    ];

    collection.create(recordset, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
};