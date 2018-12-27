var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({

  name: String,
  attributes: [{
    site: String,
    url: String
  }]

});

module.exports = mongoose.model('categories', categorySchema);