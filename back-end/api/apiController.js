module.exports = function (app) {

    // Documentation
    var Documentation = require('./documentation.controller');
    Documentation(app);

    // APIs
    var users = require('./users.controller');
    users(app);

    // TODO - Nascondi questo e tutte le API senza controlli
    var tokens = require('./tokens.controller');
    tokens(app);

    var categories = require('./categories.controller');
    categories(app);

    var sites = require('./sites.controller');
    sites(app);

    var noteCategories = require('./noteCategories.controller');
    noteCategories(app);

    var notes = require('./notes.controller');
    notes(app);
};