var fs = require('fs');

module.exports = function (app) {

  app.get('/documentation', function (req, res) {

    // TODO - documentation
    
    var site = fs.readFileSync(__dirname + '/site.htm', 'utf8');
    var table = fs.readFileSync(__dirname + '/table.htm', 'utf8');

    // html = '<html><head></head><body><h1>{Title}</h1></body></html>';

    var tables = table + table + table;
    var html = site.replace('{Tables}', tables);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  });
};