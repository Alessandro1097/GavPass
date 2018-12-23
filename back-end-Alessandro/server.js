var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupGavpass = require('./controllers/setupController');
var apiController = require('./controllers/apiController');
const cors = require('cors');

var port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());
app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
setupGavpass(app);
apiController(app);

app.listen(port);
