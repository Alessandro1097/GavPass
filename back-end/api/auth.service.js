// Authentication
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const secretConfig = require('../config/secret.json');
const tokenService = require('./token.service');

module.exports = {
    getToken,
    checkToken,
    login,
    logout
};

function getToken(req) {

    var key = req.get('Authorization');
    if (key) key = key.replace('Bearer ', '');

    return key;
}

async function checkToken(req, res, apiFunction) {

    var key = getToken(req);
    if ( ! key ) return res.status(401).send({ auth: false, message: 'No token provided.' });

    tokenService.getByKey(key)
        .then(result => checkTokenData(result, req, res))
        .catch(err => next(err));

    function checkTokenData(token, req, res) {
        
        jwt.verify(token.key, secretConfig.secret, function (err, decoded) {
            
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            var today = new Date();
            if (today >= token.expiryDate) return res.status(500).send({ auth: false, message: 'Token expired.' });

            // Call the function required
            apiFunction(token.user, req, res);
        });
    }
}

async function login(user, req, res) {

    var badResult = { auth: false, token: null };

    if ( ! user ) {
        res.status(404).send('No user found.');
        return badResult;
    }

    var passwordIsValid = bcrypt.compareSync(req.body.pwd, user.pwd);

    if ( ! passwordIsValid ) {
        res.status(401).send(badResult);
        return badResult;
    }

    var token = jwt.sign({ id: user._id }, secretConfig.secret, {
        expiresIn: 86400 // expires in 24 hours
    });

    var goodResult = { auth: true, message: "That's the token bro ;)", token: token, user: user.email }

    res.status(200).send(goodResult);
    return goodResult;
}

async function logout(res) {

    var goodResult = { auth: false, token: null };

    // The token must expire on its own
    res.status(200).send(goodResult);
    return goodResult;
}