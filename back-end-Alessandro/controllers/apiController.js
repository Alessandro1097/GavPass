var GavPass = require('../models/gavpassModel');
var bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // find by name
  app.get('/api/setupGavpass/:name', function (req, res) {
    GavPass.find({ name: req.params.name}, function (err, gavpass) {
      if(err) throw err;
      res.send(gavpass);
    });
  });
  // find by id
  app.get('/api/gavpass/:id', function (req, res) {
    GavPass.findById({ _id: req.params.id }, function (err, gavpass) {
      if(err) throw err;
      res.send(gavpass);
    });
  });
  app.post('/api/gavpass', function (req, res) {
    if(req.body.id) {
      GavPass.findByIdAndUpdate(req.body.id, {
        name: req.body.name, attributes: req.body.attributes
      }, function (err) {
        if (err) throw err;
        res.send('Success');
      });
    } else {
      var newGavpass = GavPass({
        name: req.body.name,
        attributes: req.body.attributes
      });
      newGavpass.save(function (err) {
        if (err) throw err;
        res.send('Success');
      });
    }
  });
  app.delete('/api/gavpass', function (res, req) {
    GavPass.findByIdAndRemove(req.body.id, function (err) {
      if (err) throw err;
      res.send('Success');
    });
  });
};
