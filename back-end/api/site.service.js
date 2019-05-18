var ObjectId = require('mongoose').Types.ObjectId;

// Request of the model
var sites = require('../models/Site');

module.exports = {
    getAll,
    getById,
    getByCategory,
    insert,
    update,
    deleteById,
    deleteByCategory
};

// Select
async function getAll(user) {
    return sites.find({ user: user }, function (err, result) {
        if (err) throw err;
        return result;
    }).sort({ name: 1 });
};

// Get by ID
async function getById(id) {
    return sites.findById({ _id: new ObjectId(id) }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get sites by Category
async function getByCategory(categoryId, user) {
    return sites.find({ category: categoryId, user: user }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Insert
async function insert(user, url, name, category, username, pwd, note) {
    var newRec = sites({
        user: user,
        url: url,
        name: name,
        category: category,
        username: username,
        pwd: pwd,
        note: note
    });

    newRec.save(function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Update
async function update(id, url, name, category, username, pwd, note) {
    sites.findByIdAndUpdate(new ObjectId(id), {
        url: url,
        name: name,
        category: category,
        username: username,
        pwd: pwd,
        note: note
    }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Delete by ID
async function deleteById(id) {
    return sites.findByIdAndRemove(new ObjectId(id), function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Delete by Category
async function deleteByCategory(categoryId, user) {
    return sites.deleteMany({ category: categoryId, user: user }, function (err, result) {
        if (err) throw err;
        return result;
    });
};