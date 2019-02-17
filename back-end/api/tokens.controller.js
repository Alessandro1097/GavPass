// Request of the service
const service = require('./token.service');
const authService = require('./auth.service');

module.exports = function (app) {

    // Select
    app.get('/api/Tokens', function (req, res, next) {
        service.getAll()
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Get by ID
    app.get('/api/Tokens/getById/:id', function (req, res, next) {
        service.getById(req.params.id)
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Save
    app.post('/api/Tokens/save', function (req, res, next) {
        if (req.body._id) {
            // Update
            service.update(req.body._id, req.body.state, req.body.effectiveDate, req.body.expiryDate)
                .then(res.json({ message: '1 document updated' }))
                .catch(err => next(err));
        } else {
            // Insert
            service.insert(req.body.token, req.body.user, req.body.state, req.body.effectiveDate, req.body.expiryDate)
                .then(res.json({ message: '1 document inserted' }))
                .catch(err => next(err));
        }
    });

    // Delete
    app.delete('/api/Tokens/delete/:id', function (req, res, next) {
        service.deleteById(req.params.id)
            .then(res.json({ message: '1 document deleted' }))
            .catch(err => next(err));
    });
};
