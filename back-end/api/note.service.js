var ObjectId = require('mongoose').Types.ObjectId;

// Request of the model
var notes = require('../models/Note');

module.exports = {
    getAll,
    getById,
    getByCategory,
    insert,
    update,
    deleteById
};

// Select
async function getAll(user) {
    return notes.find({ user: user }, function (err, result) {
        if (err) throw err;
        return result;
    }).sort({ title: 1 });
};

// Get by ID
async function getById(id) {
    return notes.findById({ _id: new ObjectId(id) }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get notes by Category
async function getByCategory(categoryId, user) {
    return notes.find({ category: categoryId, user: user }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Insert
async function insert(user, category, text, title) {
    var newRec = notes({
        user: user,
        category: category,
        text: text,
        title: title
    });

    newRec.save(function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Update
async function update(id, category, text, title) {
    notes.findByIdAndUpdate(new ObjectId(id), {
        category: category,
        text: text,
        title: title
    }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Delete by ID
async function deleteById(id) {
    return notes.findByIdAndRemove(new ObjectId(id), function (err, result) {
        if (err) throw err;
        return result;
    });
};