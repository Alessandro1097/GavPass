const config = require('../topSecret/secret.json');
const jwt = require('jsonwebtoken');

var Users = require('../models/User');

module.exports = {
    authenticate,
    getAll,
    getById
};

async function authenticate({ user_email, user_pwd }) {
    Users.find({ email: user_email, pwd: user_pwd }, function (err, result) {
        if (err) throw err;

        const token = jwt.sign({ sub: result.id, role: result.role }, config.secret);

        console.log(result);
        console.log(token);
        
        return {
            result,
            token
        };
    });
}

// Select
async function getAll() {
    return Users.find({}, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get by ID
async function getById(id) {
    Users.findById({ _id: id }, function (err, result) {
        if (err) throw err;

        const { pwd, ...userWithoutPassword } = result;
        return userWithoutPassword;
    });
}