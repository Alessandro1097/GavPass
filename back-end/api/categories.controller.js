// Request of the model
var categories = require('../models/Category');

module.exports = function (app) {

    // Select
    app.get('/api/Categories', function (req, res) {
        categories.find({}, function (err, result) {
            if(err) throw err;
            res.send(result);
        });
    });

    // Get Name
    app.get('/api/Categories/name', function (req, res) {
        categories.find({ }, { _id: 0, name: 1 }, function (err, result) {
            if(err) throw err;
            res.send(result);
        });
    });
    
    // Find by Name
    app.get('/api/Categories/findByName/:name', function (req, res) {
        categories.find({ name: req.params.name }, function (err, result) {
            if(err) throw err;
            res.send(result);
        });
    });

    // Find by Id
    app.get('/api/Categories/findById/:id', function (req, res) {
        categories.findById({ _id: req.params.id }, function (err, result) {
            if(err) throw err;
            res.send(result);
        });
    });

    // Save
    app.post('/api/Categories/save', function (req, res) {
        if(req.body.id) {
            // Update
            categories.findByIdAndUpdate(req.body.id, {
                name: req.body.name, attributes: req.body.attributes
            }, function (err) {
                if (err) throw err;
                res.send('1 document updated');
            });
        } else {
            // Insert
            var newGavpass = categories({
                name: req.body.name,
                attributes: req.body.attributes
            });
            newGavpass.save(function (err) {
                if (err) throw err;
                res.send('1 document inserted');
            });
        }
    });
    
    // Delete
    app.delete('/api/Categories/delete', function (res, req) {
        categories.findByIdAndRemove(req.body.id, function (err) {
            if (err) throw err;
            res.send('1 document deleted');
        });
    });
};