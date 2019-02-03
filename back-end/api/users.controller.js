// Request of the service
const service = require('./user.service');

// Role model
const Role = require('../models/Role');

// Authentication
const authorize = require('../_helpers/authorize')

// UNDONE - Modules online
var bcrypt = require('bcryptjs');
const config = require('../topSecret/secret.json');
const jwt = require('jsonwebtoken');

module.exports = function (app) {

    // UNDONE - Post online
    // TODO - Make this function in the service
    app.get('/me', function (req, res) {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            res.status(200).send(decoded);
        });
    });


    // FIXME - Authenticate with JWT (public route)
    // Login
    app.post('/api/Users/login', function (req, res, next) {

        service.getByEmail(req.body.email)
            .then(result => login(result, res))
            .catch(err => next(err));

        function login(user, res) {

            if (!user) return res.status(404).send('No user found.');

            var passwordIsValid = bcrypt.compareSync(req.body.pwd, user.pwd);

            console.log(passwordIsValid);

            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({
                auth: true,
                message: "That's the token bro",
                token: token });

            //     service.authenticate(req.body.email, req.body.pwd)
            //         .then(result => res.json(result))
            //         .catch(err => next(err));
        }
    });

    // Logout
    app.post('/api/Users/logout', function (req, res, next) {

        // It doesn't really logout. The token must expire on its own.
        res.status(200).send({ auth: false, token: null });
    });

    // Select (admin only)
    app.get('/api/Users', authorize(Role.Admin), function (req, res, next) {
        service.getAll()
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // FIXME - Get by ID (all authenticated users)
    app.get('/api/Users/getById/:id', authorize(), function (req, res, next) {

        const currentUser = req.user;
        const getId = parseInt(req.params.id);

        console.log

        // Only allow admins to access other user records
        if (getId !== currentUser.sub && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        userService.getById(req.params.id)
            .then(result => result ? res.json(result) : res.sendStatus(404))
            .catch(err => next(err));
    });

    // Save
    app.post('/api/Users/save', function (req, res, next) {
        if (req.body._id) {
            // Update
            service.update(req.body._id, req.body.email, req.body.phone)
                .then(res.json({ message: '1 document updated' }))
                .catch(err => next(err));
        } else {
            // Insert
            service.insert(req.body.email, req.body.pwd, req.body.phone, req.body.role)
                .then(res.json({ message: '1 document inserted' }))
                .catch(err => next(err));
        }
    });

    // Delete
    app.delete('/api/Users/delete/:id', function (req, res, next) {
        service.deleteById(req.params.id)
            .then(res.json({ message: '1 document deleted' }))
            .catch(err => next(err));
    });
};