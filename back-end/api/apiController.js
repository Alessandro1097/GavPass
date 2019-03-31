module.exports = function (app) {

    // Documentation
    var Documentation = require('./documentation.controller');
    Documentation(app);

    // APIs
    var Categories = require('./categories.controller');
    Categories(app);

    var Users = require('./users.controller');
    Users(app);

    var Sites = require('./sites.controller');
    Sites(app);
};