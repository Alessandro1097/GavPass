// Request of the model
var users = require('../models/User');
var bcrypt = require('bcryptjs');

module.exports = {
    getAll,
    getById,
    getByEmail,
    insert,
    update,
    deleteById
};

// Select
async function getAll() {
    return users.find({}, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get by ID
async function getById(id) {
    users.findById({ _id: new ObjectId(id) }, function (err, result) {
        if (err) throw err;

        const { pwd, ...userWithoutPassword } = result;
        return userWithoutPassword;
    });
};

// Get by Email
async function getByEmail(email) {
    return users.findOne({ email: email }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Insert
async function insert(email, pwd, phone, role) {

    var hashedPassword = bcrypt.hashSync(pwd, 8);

    var newRec = users({
        email: email,
        pwd: hashedPassword,
        phone: phone,
        role: role
    });

    newRec.save(function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Update
async function update(id, email, phone) {
    users.findByIdAndUpdate(new ObjectId(id), {
        email: email,
        phone: phone
    }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Delete by ID
async function deleteById(id) {
    return users.findByIdAndRemove(new ObjectId(id), function (err, result) {
        if (err) throw err;
        return result;
    });
};