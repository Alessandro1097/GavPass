// Request of the service
const service = require('./site.service');

module.exports = function (app) {

    // Select
    app.get('/api/Sites', function (req, res, next) {
        service.getAll()
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Get by ID
    app.get('/api/Sites/getById/:id', function (req, res, next) {
        service.getById(req.params.id)
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Get sites by Category
    app.get('/api/Sites/getByCategory/:categoryId', function (req, res, next) {
        service.getByCategory(req.params.categoryId)
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Save
    app.post('/api/Sites/save', function (req, res, next) {
        if(req.body.id) {
            // Update
            service.update(req.body.id, req.body.url, req.body.name, req.body.category, req.body.username, req.body.pwd, req.body.note)
                .then(res.send('1 document updated'))
                .catch(err => next(err));
        } else {
            // Insert
            service.insert(req.body.url, req.body.name, req.body.category, req.body.username, req.body.pwd, req.body.note)
                .then(res.send('1 document inserted'))
                .catch(err => next(err));
        }
    });

    // Delete
    app.delete('/api/Sites/delete', function (req, res, next) {
        service.deleteById(req.body.id)
            .then(res.send('1 document deleted'))
            .catch(err => next(err));
    });
};