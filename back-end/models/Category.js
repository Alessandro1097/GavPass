var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({

  name: String,
  attributes: [{
    site: String,
    url: String
  }]

});

// UNDONE - Gavpass??
module.exports = mongoose.model('Gavpass', categorySchema);