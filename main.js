var express= require('express');
var app = express();
var bodyParser= require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');

var port = process.env.PORT || 1111;

mongoose.connect('mongodb://127.0.0.1:27017/test');

//Body parse forms data
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(bodyParser.json({type: 'application/vnd.api + json'}));

//where to look for static files
app.use(express.static(__dirname +'/public'));

require('./app/routes.js')(app);

app.listen(port, function(){
  console.log("Server is running!");
});
