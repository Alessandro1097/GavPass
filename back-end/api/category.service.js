// Request of the model
var categories = require('../models/Category');

module.exports = {
    getAll,
    getName,
    getById,
    getByName,
    insert,
    update,
    deleteById
};

// Select
async function getAll() {
    return categories.find({}, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get Name
async function getName() {
    return categories.find({ }, { _id: 0, name: 1 }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get by ID
async function getById(id) {
    return categories.findById({ _id: id }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get by Name
async function getByName(name) {
    return categories.find({ name: name }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Insert
async function insert(name, attributes) {
    var newRec = categories({
        name: name,
        attributes: attributes
    });

    newRec.save(function (err) {
        if (err) throw err;
        /* 1 document inserted */
        return true;
    });
};

// Update
async function update(id, name, attributes) {
    categories.findByIdAndUpdate(id, {
        name: name, attributes: attributes
    }, function (err) {
        if (err) throw err;
        /* 1 document updated */
        return true;
    });
};

// Delete by ID
async function deleteById(id) {
    return categories.findByIdAndRemove(id, function (err) {
        if (err) throw err;
        /* 1 document deleted */
        return true;
    });
};