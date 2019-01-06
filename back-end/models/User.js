var mongoose = require('mongoose');
const Role = require('./Role');
var Schema = mongoose.Schema;

var mySchema = new Schema({

    email: { type: String, required: true, index: { unique: true } },
    pwd: { type: String, required: true },
    phone: { type: String, required: false },
    role: { type: Role, required: true }
});

module.exports = mongoose.model('users', mySchema);