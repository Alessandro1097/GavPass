var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({

    user: { type: String, required: true, ref: 'User' },
    url: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    username: { type: String, required: true },
    pwd: { type: String, required: true },
    note: { type: String, required: false }
});

module.exports = mongoose.model('sites', mySchema);