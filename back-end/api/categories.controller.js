// Request of the service
const service = require('./category.service');

module.exports = function (app) {

    // Select
    app.get('/api/Categories', function (req, res, next) {
        service.getAll()
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Get Name
    app.get('/api/Categories/name', function (req, res, next) {
        service.getName()
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Get by ID
    app.get('/api/Categories/getById/:id', function (req, res, next) {
        service.getById(req.params.id)
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Get by Name
    app.get('/api/Categories/getByName/:name', function (req, res, next) {
        service.getByName(req.params.name)
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Save
    app.post('/api/Categories/save', function (req, res, next) {
        if(req.body.id) {
            // Update
            service.update(req.body.id, req.body.name)
                .then(res.send('1 document updated'))
                .catch(err => next(err));
        } else {
            // Insert
            service.insert(req.body.name, "master")
                .then(res.send('1 document inserted'))
                .catch(err => next(err));
        }
    });
    

    // Delete
    app.delete('/api/Categories/delete', function (req, res, next) {
        service.deleteById(req.body.id)
            .then(res.send('1 document deleted'))
            .catch(err => next(err));
    });
};