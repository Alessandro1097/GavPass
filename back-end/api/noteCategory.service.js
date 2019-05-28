var ObjectId = require('mongoose').Types.ObjectId;

// Request of the model
var categories = require('../models/NoteCategory');

module.exports = {
    getAll,
    getName,
    getById,
    getByName,
    getNameId,
    insert,
    update,
    insertDefaultCategories,
    deleteById
};

// Select
async function getAll(user) {
    return categories.find({ user: user }, function (err, result) {
        if (err) throw err;
        return result;
    }).sort({ name: 1 });
};

// Get Name
async function getName(user) {
    return categories.find({ user: user }, { _id: 0, name: 1 }, function (err, result) {
        if (err) throw err;
        return result;
    }).sort({ name: 1 });
};

// Get Name & Id
async function getNameId(user) {
    return categories.find({ user: user }, { _id: 1, name: 1 }, function (err, result) {
        if (err) throw err;
        return result;
    }).sort({ name: 1 });
};

// Get by ID
async function getById(id) {
    return categories.findById({ _id: new ObjectId(id) }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get by Name
async function getByName(name, user) {
    return categories.findOne({ name: name, user: user }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Insert
async function insert(name, user) {
    var newRec = categories({
        name: name,
        user: user
    });

    newRec.save(function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Update
async function update(id, name) {
    categories.findByIdAndUpdate(new ObjectId(id), {
        name: name
    }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Insert default categories
async function insertDefaultCategories(user) {

    var defaultCategories = [
        {
            name: "Untagged",
            user: user
        }
    ];

    categories.create(defaultCategories, function (err, results) {
        if (err) throw err;
    });
};

// Delete by ID
async function deleteById(id) {
    return categories.findByIdAndRemove(new ObjectId(id), function (err, result) {
        if (err) throw err;
        return result;
    });
};