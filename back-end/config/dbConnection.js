var dbCredentials = require('./dbCredentials');

module.exports = {
  getDbConnectionString: function () {
    return 'mongodb://' + dbCredentials.uname + ':' + dbCredentials.pwd + dbCredentials.link;
  }
};