// Request of the service
const service = require('./user.service');
const authService = require('./auth.service');
const categoryService = require('./category.service');
const tokenService = require('./token.service');

module.exports = function (app) {

    // Login
    app.post('/api/Users/login', function (req, res, next) {

        service.getByEmail(req.body.email)
            .then(result => login(result, req, res))
            .catch(err => next(err));

        function login(user, req, res) {

            authService.login(user, req, res)
                .then(result => createToken(result))
                .catch(err => next(err));
        }

        function createToken(loginResult) {

            // If the authentication fails
            if (!loginResult.auth) return;

            var today = new Date();
            var exp = new Date(today.getFullYear() + 1, today.getMonth(), today.getDay())

            tokenService.insert(loginResult.token, loginResult.user, 1, today, exp)
                .then(result => result)
                .catch(err => next(err));
        }
    });

    // Logout
    app.post('/api/Users/logout', function (req, res, next) {

        authService.logout(res)
            .then(result => tokenExpired(result, req.body.email))
            .catch(err => next(err));

        function tokenExpired(logoutResult, tokenId) {

            // If the log-out fails
            if (logoutResult.auth) return;

            service.getById(req.params.id)
                .then(result => res.json(result))
                .catch(err => next(err));

            // TODO - Aggiorna solo data scadenza (e prendi in ingresso il token, non l'id su DB)
            tokenService.deleteById(tokenId)
                .then(result => result)
                .catch(err => next(err));
        }
    });

    // Select (admin only)
    app.get('/api/Users', function (req, res, next) {
        service.getAll()
            .then(result => res.json(result))
            .catch(err => next(err));
    });

    // Get by ID
    // FIXME - Send status
    app.get('/api/Users/getById/:id', function (req, res, next) {

        userService.getById(req.params.id)
            .then(result => result ? res.json(result) : res.sendStatus(404))
            .catch(err => next(err));
    });

    // Save
    app.post('/api/Users/save', function (req, res, next) {
        if (req.body._id) {
            // Update
            service.update(req.body._id, req.body.email, req.body.phone)
                .then(res.json({ message: '1 document updated' }))
                .catch(err => next(err));
        } else {
            // Insert
            service.insert(req.body.email, req.body.pwd, req.body.phone, req.body.role)
                .then(result => insertSuccessful(req.body.email, res))
                .catch(err => next(err));
        }

        function insertSuccessful(user, res) {
            categoryService.insertDefaultCategories(user)
                .then(res.json({ message: '1 document inserted' }))
                .catch(err => next(err));
            ;
        }
    });

    // Delete
    app.delete('/api/Users/delete/:id', function (req, res, next) {
        service.deleteById(req.params.id)
            .then(res.json({ message: '1 document deleted' }))
            .catch(err => next(err));
    });
};