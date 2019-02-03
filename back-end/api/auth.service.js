// Authentication
const config = require('../topSecret/secret.json');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate
};

async function authenticate(token) {

    if (!token) {
        return {
            "status": 401,
            "result": { auth: false, message: 'No token provided.' }
        };
    }

    return jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return {
                "status": 500,
                "result": { auth: false, message: 'Failed to authenticate token.' }
            };
        }
        
        return {
            "status": 200,
            "result": decoded
        };
    });
};