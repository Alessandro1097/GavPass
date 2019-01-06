var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({

    name: String,
    user: String

});

module.exports = mongoose.model('categories', mySchema);