// Request of the service
const service = require('./category.service');
const authService = require('./auth.service');

module.exports = function (app) {

    // Select
    app.get('/api/Categories', function (req, res, next) {
        authService.checkToken(req, res, function (req, res) {
            service.getAll()
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get Name & Id
    app.get('/api/Categories/name', function (req, res, next) {
        authService.checkToken(req, res, function (req, res) {
            service.getNameId()
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get by ID
    app.get('/api/Categories/getById/:id', function (req, res, next) {
        authService.checkToken(req, res, function (req, res) {
            service.getById(req.params.id)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get by Name
    app.get('/api/Categories/getByName/:name', function (req, res, next) {
        authService.checkToken(req, res, function (req, res) {
            service.getByName(req.params.name)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Save
    app.post('/api/Categories/save', function (req, res, next) {
        authService.checkToken(req, res, function (req, res) {
            if (req.body._id) {
                // Update
                service.update(req.body._id, req.body.name)
                    .then(res.json({ message: '1 document updated' }))
                    .catch(err => next(err));
            } else {
                // Insert
                service.insert(req.body.name, "master")
                    .then(res.json({ message: '1 document inserted' }))
                    .catch(err => next(err));
            }
        });
    });

    // Delete
    app.delete('/api/Categories/delete/:id', function (req, res, next) {
        authService.checkToken(req, res, function (req, res) {
            service.deleteById(req.params.id)
                .then(res.json({ message: '1 document deleted' }))
                .catch(err => next(err));
        });
    });
};
