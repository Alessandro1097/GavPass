// Request of the service
const service = require('./noteCategory.service');
const authService = require('./auth.service');

module.exports = function (app) {

    // Select
    app.get('/api/NoteCategories', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getAll(verifiedUser)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get Name & Id
    app.get('/api/NoteCategories/name', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getNameId(verifiedUser)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get by ID
    app.get('/api/NoteCategories/getById/:id', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getById(req.params.id)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Get by Name
    app.get('/api/NoteCategories/getByName/:name', function (req, res, next) {
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.getByName(req.params.name, verifiedUser)
                .then(result => res.json(result))
                .catch(err => next(err));
        });
    });

    // Save
    app.post('/api/NoteCategories/save', function (req, res, next) {
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
    app.delete('/api/NoteCategories/delete/:id', function (req, res, next) {
        // TODO - Cancella tutte le sue note
        authService.checkToken(req, res, function (verifiedUser, req, res) {
            service.deleteById(req.params.id)
                .then(res.json({ message: '1 document deleted' }))
                .catch(err => next(err));
        });
    });
};
