var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({

    token: { type: String, required: true, index: { unique: true } },
    user: { type: String, required: true, ref: 'User' },
    state: { type: String, 
             enum: [1, 2], // 0-Non valido; 1-Valido; 2-Scaduto
             required: true },
    effectiveDate: { type: Date, required: false },
    expiryDate: { type: Date, required: false }
});

module.exports = mongoose.model('tokens', mySchema);