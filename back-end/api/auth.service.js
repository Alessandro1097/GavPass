// Authentication
const config = require('../topSecret/secret.json');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// Request of the model
var tokens = require('../models/Token');

module.exports = {
    checkToken,
    login,
    logout
};

async function checkToken(req, res, apiFunction) {
    
    var token = req.get('Authorization');
    token = token.replace('Bearer ', '');

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        //res.status(200).send(decoded);
        apiFunction(req, res);
    });
}

async function login(user, req, res) {

    var badResult = { auth: false, token: null };

    if (!user) {
        res.status(404).send('No user found.');
        return badResult;
    }

    var passwordIsValid = bcrypt.compareSync(req.body.pwd, user.pwd);

    if (!passwordIsValid) {
        res.status(401).send(badResult);
        return badResult;
    }

    var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });

    var goodResult = { auth: true, message: "That's the token bro", token: token, user: user.email }

    res.status(200).send(goodResult);
    return goodResult;
}

async function logout(res) {

    var goodResult = { auth: false, token: null };

    // The token must expire on its own
    res.status(200).send(goodResult);
    return goodResult;
}