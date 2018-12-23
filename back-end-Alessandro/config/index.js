var configValues = require('./config');

module.exports = {
  getDbConnectionString: function () {
    return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds141654.mlab.com:41654/gavpass';
  }
};
