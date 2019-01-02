module.exports = function (app) {
    var Categories = require('./Categories');
    Categories(app);

    var Users = require('./Users');
    Users(app);
};