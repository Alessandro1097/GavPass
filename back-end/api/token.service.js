var ObjectId = require('mongoose').Types.ObjectId;

// Request of the model
var tokens = require('../models/Token');

// Request of the service
const tokenService = require('./token.service');

module.exports = {
    getAll,
    getById,
    insert,
    update,
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

// Insert
async function insert(ggtoken, user, state, effectiveDate, expiryDate) {
    var newRec = tokens({
    token: ggtoken,
    user: user,
    state: state, // 0-Non valido; 1-Valido; 2-Scaduto
    effectiveDate: new Date(effectiveDate),
    expiryDate: new Date(expiryDate)
    });

    newRec.save(function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Update
async function update(id, state, effectiveDate, expiryDate) {
    tokens.findByIdAndUpdate(new ObjectId(id), {
        state: state, // 0-Non valido; 1-Valido; 2-Scaduto
        effectiveDate: new Date(effectiveDate),
        expiryDate: new Date(expiryDate)
    }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Delete by ID
async function deleteById(id) {
    return tokens.findByIdAndRemove(new ObjectId(id), function (err, result) {
        if (err) throw err;
        return result;
    });
};