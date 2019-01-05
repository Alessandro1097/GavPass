// Request of the model
var users = require('../models/User');

// Authentication
const config = require('../topSecret/secret.json');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate,
    getAll,
    getById
};

async function authenticate({ user_email, user_pwd }) {
    users.find({ email: user_email, pwd: user_pwd }, function (err, result) {
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