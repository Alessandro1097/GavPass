var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var gavpassSchema = new Schema({

  name: String,
  attributes: [{
    site: String,
    url: String
  }]

});

var Gavpass = mongoose.model('Gavpass', gavpassSchema);

module.exports = Gavpass;
