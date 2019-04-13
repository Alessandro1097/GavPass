// Request of the service
const service = require('./site.service');
const categoryService = require('./category.service');
const authService = require('./auth.service');

module.exports = function (app) {

    // Select
    app.get('/api/Sites', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getAll(verifiedUser)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get by ID
    app.get('/api/Sites/getById/:id', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getById(req.params.id)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get sites by Category name
    app.get('/api/Sites/getByCategory/:categoryName', function (req, res, next) {

        authService.checkToken(req, res, function (verifiedUser, req, res) {
            categoryService.getByName(req.params.categoryName, verifiedUser)
                .then(result => findSites(result, verifiedUser, req, res))
                .catch(err => next(err));
        });

        function findSites(category, user, req, res) {

            service.getByCategory(category._id, user)
                .then(result => res.json(result))
                .catch(err => next(err));
        }
    });

    // Save
    app.post('/api/Sites/save', function (req, res, next) {

        authService.checkToken(req, res, function (verifiedUser, req, res) {

            if (req.body._id) {
                // Update
                service.update(req.body._id, req.body.url, req.body.name, req.body.category, req.body.username, req.body.pwd, req.body.note)
                    .then(res.json({ message: '1 document updated' }))
                    .catch(err => next(err));
            } else {
                // Insert
                service.insert(verifiedUser, req.body.url, req.body.name, req.body.category, req.body.username, req.body.pwd, req.body.note)
                    .then(res.json({ message: '1 document inserted' }))
                    .catch(err => next(err));
            }
        });
    });

    // Delete
    app.delete('/api/Sites/delete/:id', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.deleteById(req.params.id)
                .then(res.json({ message: '1 document deleted' }))
                .catch(err => next(err));
        });
    });
};