var ObjectId = require('mongoose').Types.ObjectId;

// Request of the model
var notes = require('../models/Note');

module.exports = {
    getAll,
    getById,
    getByCategory,
    groupByCategory,
    insert,
    update,
    deleteById,
    deleteByCategory
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
    }).sort({ title: 1 });
};

// Get notes grouped by Category
async function groupByCategory(allNotes, allCategories) {

    var result = [];

    allCategories.forEach(function (category) {

        var categoryNotes = allNotes.filter( isSon );

        allNotes = allNotes.filter( isNotSon );

        var element = {
            _id: category.id,
            category: category.name,
            notes: categoryNotes
        };

        result.push(element);

        function isSon(element, index, array) {
            return element.category == category.id;
        }

        function isNotSon(element, index, array) {
            return element.category != category.id;
        }
    });

    return result;
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

// Delete by Category
async function deleteByCategory(categoryId, user) {
    return notes.deleteMany({ category: categoryId, user: user }, function (err, result) {
        if (err) throw err;
        return result;
    });
};