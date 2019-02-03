// Request of the service
const service = require('./category.service');

module.exports = function (app) {

    // Select
    app.get('/api/Categories', function (req, res, next) {
        service.getAll()
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Get Name & Id
    app.get('/api/Categories/name', function (req, res, next) {
        // UNDONE - Request of the auth.service
        const auth = require('./auth.service');
        
        var token = req.get('Authorization');

        auth.authenticate(token)
            .then(result => sendResult(result, res))
            .catch(err => next(err));

        function sendResult(result, res) {

            console.log(result);
            res.status(result.status).send(result.status)

            /* const c = await doubleAfter2Seconds(30);

        }

/*         if (authRes.xxx == 500) {
            switch(authRes) {
                case -1:
                    return res.status(401).send({ auth: false, message: 'No token provided.' });
                case 2:
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            } */
        

        service.getNameId()
            .then(result => res.json(result))
            .catch(err => next(err));

            // res.status(200).send(decoded);
        }
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
        if(req.body._id) {
            // Update
            service.update(req.body._id, req.body.name)
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
    app.delete('/api/Categories/delete/:id', function (req, res, next) {
        service.deleteById(req.params.id)
            .then(res.json({ message: '1 document deleted' }))
            .catch(err => next(err));
    });
};