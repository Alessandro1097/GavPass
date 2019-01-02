// Request of the model
// FIXME - The model is already declared in the service
var Users = require('../models/User');

// Request of the service
const service = require('./user.service');
const authorize = require('../_helpers/authorize')
const Role = require('../models/Role');

module.exports = function (app) {

    // FIXME - Authenticate with JWT (public route)
    // TODO - How to call POST?
    app.post('/jwt_authenticate/', function (req, res, next) {
        service.authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
            .catch(err => next(err));
    });

    // Select (admin only)
    app.get('/api/Users', authorize(Role.Admin), function (req, res, next) {
        service.getAll()
            .then(users => res.json(users))
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
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    });

    // Get Email
    app.get('/api/Users/email', function (req, res) {
        Users.find({}, { _id: 0, email: 1, accountType: 1 }, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    // Find by Email
    app.get('/api/Users/findByEmail/:email', function (req, res) {
        Users.find({ email: req.params.email }, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    // Find by Id
    app.get('/api/Users/findById/:id', function (req, res) {
        Users.findById({ _id: req.params.id }, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    // Save
    app.post('/api/Users/save', function (req, res) {
        if (req.body.id) {
            // Update
            Users.findByIdAndUpdate(req.body.id, {
                email: req.body.email, attributes: req.body.attributes
            }, function (err) {
                if (err) throw err;
                res.send('1 document updated');
            });
        } else {
            // Insert
            var newGavpass = Users({
                email: req.body.email,
                attributes: req.body.attributes
            });
            newGavpass.save(function (err) {
                if (err) throw err;
                res.send('1 document inserted');
            });
        }
    });

    // Delete
    app.delete('/api/Users/delete', function (res, req) {
        Users.findByIdAndRemove(req.body.id, function (err) {
            if (err) throw err;
            res.send('1 document deleted');
        });
    });
};