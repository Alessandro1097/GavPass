// Request of the service
const service = require('./note.service');
const categoryService = require('./noteCategory.service');
const authService = require('./auth.service');

module.exports = function (app) {

    // Select
    app.get('/api/Notes', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getAll(verifiedUser)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Select grouped by categories
    app.get('/api/Notes/GroupCategory', function (req, res, next) {

        authService.checkToken(req, res, function (verifiedUser, req, res) {
            categoryService.getAll(verifiedUser)
                .then(result => getNotes(result, verifiedUser, req, res))
                .catch(err => next(err));
        });

        function getNotes(categories, verifiedUser, req, res) {

            service.getAll(verifiedUser)
                .then(result => groupNotes(result, categories, verifiedUser, req, res))
                .catch(err => next(err));
        }

        function groupNotes(notes, categories, user, req, res) {

            service.groupByCategory(notes, categories)
                .then(result => res.json(result))
                .catch(err => next(err));
        }
    });

    // Get by ID
    app.get('/api/Notes/getById/:id', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getById(req.params.id)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get notes by Category name
    app.get('/api/Notes/getByCategory/:categoryName', function (req, res, next) {

        authService.checkToken(req, res, function (verifiedUser, req, res) {
            categoryService.getByName(req.params.categoryName, verifiedUser)
                .then(result => findNotes(result, verifiedUser, req, res))
                .catch(err => next(err));
        });

        function findNotes(category, user, req, res) {

            service.getByCategory(category._id, user)
                .then(result => res.json(result))
                .catch(err => next(err));
        }
    });

    // Save
    app.post('/api/Notes/save', function (req, res, next) {

        authService.checkToken(req, res, function (verifiedUser, req, res) {

            if (req.body._id) {
                // Update
                service.update(req.body._id, req.body.category, req.body.text, req.body.title)
                    .then(res.json({ message: '1 document updated' }))
                    .catch(err => next(err));
            } else {
                // Insert
                service.insert(verifiedUser, req.body.category, req.body.text, req.body.title)
                    .then(res.json({ message: '1 document inserted' }))
                    .catch(err => next(err));
            }
        });
    });

    // Delete
    app.delete('/api/Notes/delete/:id', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.deleteById(req.params.id)
                .then(res.json({ message: '1 document deleted' }))
                .catch(err => next(err));
        });
    });
};