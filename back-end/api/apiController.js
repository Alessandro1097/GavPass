module.exports = function (app) {
    var Categories = require('./categories.controller');
    Categories(app);

    var Users = require('./users.controller');
    Users(app);

    var Sites = require('./sites.controller');
    Sites(app);
};