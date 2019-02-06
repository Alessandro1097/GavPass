// Authentication
const config = require('../topSecret/secret.json');
const jwt = require('jsonwebtoken');

module.exports = {
    checkToken
};

async function checkToken(req, res, apiFunction) {

    // HACK - Sempre vero
    apiFunction(req, res);
    return;
    
    var token = req.get('Authorization');
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        //res.status(200).send(decoded);
        apiFunction(req, res);
    });
}