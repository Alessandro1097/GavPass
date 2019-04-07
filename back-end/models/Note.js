var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({

    user: { type: String, required: true, ref: 'User' },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'NoteCategory' },
    text: { type: String, required: true },
    title: { type: String, required: false }
});

module.exports = mongoose.model('notes', mySchema);