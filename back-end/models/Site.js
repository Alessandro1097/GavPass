var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({

    url: { type: String },
    name: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    username: { type: String },
    pwd: { type: String },
    note: { type: String }
});

module.exports = mongoose.model('sites', mySchema);