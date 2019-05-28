// Request of the service
const service = require('./token.service');

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

    // Get by Key
    app.get('/api/Tokens/getByKey/:key', function (req, res, next) {
        service.getByKey(req.params.key)
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Save
    app.post('/api/Tokens/save', function (req, res, next) {
        if (req.body._id) {
            // Update
            service.update(req.body._id, req.body.effectiveDate, req.body.expiryDate)
                .then(res.json({ message: '1 document updated' }))
                .catch(err => next(err));
        } else {
            // Insert
            service.insert(req.body.key, req.body.user, req.body.effectiveDate, req.body.expiryDate)
                .then(res.json({ message: '1 document inserted' }))
                .catch(err => next(err));
        }
    });

    // Update expiry date by Key
    app.post('/api/Tokens/expire', function (req, res, next) {
        service.expire(req.body.key, req.body.expiryDate)
            .then(res.json({ message: '1 document updated' }))
            .catch(err => next(err));
    });

    // Delete
    app.delete('/api/Tokens/delete/:id', function (req, res, next) {
        service.deleteById(req.params.id)
            .then(res.json({ message: '1 document deleted' }))
            .catch(err => next(err));
    });
};