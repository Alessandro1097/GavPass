// Request of the model
var Users = require('../models/User');

module.exports = function (app) {

    // Select
    app.get('/api/Users', function (req, res) {
        Users.find({}, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
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





    // FIXME - JWT
    const userService = require('.jwt/user.service');

    // routes
    app.post('/jwt/authenticate', authenticate);
    app.get('/jwt/', getAll);

    function authenticate(req, res, next) {
        userService.authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
            .catch(err => next(err));
    }

    function getAll(req, res, next) {
        userService.getAll()
            .then(users => res.json(users))
            .catch(err => next(err));
    }




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