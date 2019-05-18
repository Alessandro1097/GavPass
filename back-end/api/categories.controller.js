// Request of the service
const service = require('./category.service');
const siteService = require('./site.service');
const authService = require('./auth.service');

module.exports = function (app) {

    // Select
    app.get('/api/Categories', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getAll(verifiedUser)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get Name & Id
    app.get('/api/Categories/name', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getNameId(verifiedUser)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get by ID
    app.get('/api/Categories/getById/:id', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getById(req.params.id)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get by Name
    app.get('/api/Categories/getByName/:name', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getByName(req.params.name, verifiedUser)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Save
    app.post('/api/Categories/save', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            if (req.body._id) {
                // Update
                service.update(req.body._id, req.body.name)
                    .then(res.json({ message: '1 document updated' }))
                    .catch(err => next(err));
            } else {
                // Insert
                service.insert(req.body.name, verifiedUser)
                    .then(res.json({ message: '1 document inserted' }))
                    .catch(err => next(err));
            }
        });
    });

    // Delete
    app.delete('/api/Categories/delete/:id', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.deleteById(req.params.id)
                .then(result => deleteSites(req.params.id, verifiedUser, req, res))
                .catch(err => next(err));
        });

        function deleteSites(categoryId, user, req, res) {

            siteService.deleteByCategory(categoryId, user)
                .then(res.json({ message: 'Category and sites deleted' }))
                .catch(err => next(err));
        }
    });
};