// Request of the service
const service = require('./user.service');

// Role model
const Role = require('../models/Role');

// Authentication
const authorize = require('../_helpers/authorize')

module.exports = function (app) {

    // FIXME - Authenticate with JWT (public route)
    // TODO - How to call POST?
    app.post('/jwt_authenticate/', function (req, res, next) {
        service.authenticate(req.body)
            .then(result => result ? res.json(result) : res.status(400).json({ message: 'Username or password is incorrect' }))
            .catch(err => next(err));
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
};