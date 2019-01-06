var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({

    name: { type: String, required: true },
    user: { type: String, required: true }

});

module.exports = mongoose.model('categories', mySchema);