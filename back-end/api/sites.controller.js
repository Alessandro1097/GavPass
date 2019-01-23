// Request of the service
const service = require('./site.service');
const categoryService = require('./category.service');

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

    // Get sites by Category name
    app.get('/api/Sites/getByCategory/:categoryName', function (req, res, next) {

        categoryService.getByName(req.params.categoryName)
            .then(result => findSites(result, res))
            .catch(err => next(err));

        function findSites(category, res) {
            service.getByCategory(category._id)
                .then(result => res.json(result))
                .catch(err => next(err));
        }
    });

    // Save
    app.post('/api/Sites/save', function (req, res, next) {
        // TODO: PER ANDRE, CAMBIA COME PREFERISCI
        console.log('RES:', req.body._id);
        if (req.body._id) {
            // Update
            req.body.id = req.body._id;
            console.log('REQ update', req.body.id);
            console.log('OK');
            service.update(req.body.id, req.body.url, req.body.name, req.body.category, req.body.username, req.body.pwd, req.body.note)
                .then(res.json({ message: '1 document updated' }))
                .catch(err => next(err));
        } else {
            // Insert
            console.log('KO');
            service.insert(req.body.user, req.body.url, req.body.name, req.body.category, req.body.username, req.body.pwd, req.body.note)
                .then(res.json({ message: '1 document inserted' }))
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