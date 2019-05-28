var ObjectId = require('mongoose').Types.ObjectId;

// Request of the model
var tokens = require('../models/Token');

module.exports = {
    getAll,
    getById,
    getByKey,
    insert,
    update,
    expire,
    deleteById
};

// Select
async function getAll() {
    return tokens.find({}, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get by ID
async function getById(id) {
    return tokens.findById({ _id: new ObjectId(id) }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get by Key
async function getByKey(key) {
    return tokens.findOne({ key: key }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Insert
async function insert(key, user, effectiveDate, expiryDate) {
    var newRec = tokens({
    key: key,
    user: user,
    effectiveDate: new Date(effectiveDate),
    expiryDate: new Date(expiryDate)
    });

    newRec.save(function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Update
async function update(id, effectiveDate, expiryDate) {
    tokens.findByIdAndUpdate(new ObjectId(id), {
        effectiveDate: new Date(effectiveDate),
        expiryDate: new Date(expiryDate)
    }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Update expiry date by Key
async function expire(key, expiryDate) {
    return tokens.findOne({ key: key }, function (err, token) {
        if (err) throw err;

        token.expiryDate = expiryDate;

        return token.save(function (err, result) {
            if (err) throw err;
            return result;
        });
    });
};

// Delete by ID
async function deleteById(id) {
    return tokens.findByIdAndRemove(new ObjectId(id), function (err, result) {
        if (err) throw err;
        return result;
    });
};