var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var data = require('../myjsonfile.json');


module.exports = function(app){

	app.get('/todo', function(req, res){
		res.render('todo', {todos: data});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		data.push(req.body);
		var jsonData = JSON.stringify(data);
		fs.writeFile('myjsonfile.json', jsonData, 'utf8', function(){
		});
		res.json(data);	
	});

	app.delete('/todo/:item', urlencodedParser, function(req, res){
		data = data.filter(function(todo) {
			return todo.item.replace(/ /g, '-') !== req.params.item;
			//filter through data objects and replace all white space Walk Dog => Walk-Dog
			//if Walk-Dog !== req.params.item (Mow-Lawn) return if it is TRUE
			//Walk-Dog !== Walk-Dog FALSE Filter it
		});
		var jsonData = JSON.stringify(data);

		fs.writeFile('myjsonfile.json', jsonData, 'utf8', function(){
		});
		
		 res.json(data);	
	});
	
};