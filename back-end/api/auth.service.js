// Authentication
const config = require('../topSecret/secret.json');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: authenticate
};

async function authenticate(token) {

    return 999;


    
    if (!token) {
        return 401;
/*         return {
            status = 401,
            result = { auth: false, message: 'No token provided.' }
        }; */
    }

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return { status: 500 };
        return 500;
/*         return {
                status = 500,
                result = { auth: false, message: 'Failed to authenticate token.' }
            }; */
    }

        return 200;
/*         return {
            status = 200,
            result = decoded
        }; */
    });
};