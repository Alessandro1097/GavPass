var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({

    key: { type: String, required: true, index: { unique: true } },
    user: { type: String, required: true, ref: 'User' },
    effectiveDate: { type: Date, required: false },
    expiryDate: { type: Date, required: false }
});

module.exports = mongoose.model('tokens', mySchema);