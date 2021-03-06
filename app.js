var express = require('express');
var todoController = require('./controllers/todoController');
var todoControllerOld = require('./controllers/todoControllerOld');

var port = 3000;

var app = express();

//default look in views folder
app.set('view engine', 'ejs');

//static files every route will look in the /public folder
app.use(express.static('./public'));

//fire controllers
todoController(app);
// todoControllerOld(app);
//this controller writes to a local file

app.listen(port, function(){
	console.log('JLab is running at localhost:'+port);
});