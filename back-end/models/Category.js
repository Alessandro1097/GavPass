var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({

    name: String,
    userid: String

});

module.exports = mongoose.model('categories', mySchema);