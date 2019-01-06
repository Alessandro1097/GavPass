var ObjectId = require('mongodb').ObjectID;

// Request of the model
var categories = require('../models/Category');
var sites = require('../models/Site');

module.exports = {
    getAll,
    getName,
    getById,
    getByName,
    getSites,
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
    return categories.find({}, { _id: 0, name: 1 }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get by ID
async function getById(id) {

    return categories.findById({ _id: new ObjectId(id) }, function (err, result) {
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

// Get sites by Name
async function getSites(name) {

    var rsQuery = categories.find({ name: name }, function (err, result) {
        if (err) throw err;

        var attributes = [];

        result.forEach(function (item) {
            var site = {
                site: item.name
                //url: item.sites.url
            }
            attributes.push(site);
        });

        return result;
    });

    var attributes = [];
    return rsQuery;


    rsQuery.forEach(function (item) {
        var site = {
            site: item.sites.name,
            url: item.sites.url
        }
        attributes.push(site);
    });

    return result = {
        name: rsQuery[0].name,
        attributes: attributes
    }
};

// Insert
async function insert(name, userid) {
    var newRec = categories({
        name: name,
        userid: userid
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

// Delete by ID
async function deleteById(id) {
    return categories.findByIdAndRemove(new ObjectId(id), function (err, result) {
        if (err) throw err;
        return result;
    });
};