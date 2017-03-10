var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var data = require('../myjsonfile.json');

//MLAB
mongoose.connect('mongodb://jesse:jesse@ds127260.mlab.com:27260/node-todo/todos');
//Create Schema --like a blueprint
var todoSchema = new mongoose.Schema({
	item: String
});
//Create Model
var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'bake cookies'}).save(function(err){
// 	if (err) throw err;
// 	console.log('saved');
// })
//create and manually save to MLAB

// var data = [
// 	{item: 'Walk Dog'},
// 	{item: 'Take Out Garbage'},
// 	{item: 'Read More'},
// 	{item: 'Code More'},
// ];

module.exports = function(app){

	app.get('/todo', function(req, res){
		// res.render('todo', {todos: data});
		Todo.find({}, function(err, data){
			if (err) throw err;
			res.render('todo', {todos: data});
		})
	});

	app.post('/todo', urlencodedParser, function(req, res){
		// data.push(req.body);
		// var jsonData = JSON.stringify(data);
		// fs.writeFile('myjsonfile.json', jsonData, 'utf8', function(){
		// });
		// res.json(data);
		var newTodo = Todo(req.body).save(function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});

	app.delete('/todo/:item', urlencodedParser, function(req, res){
		//data = data.filter(function(todo) {
			//return todo.item.replace(/ /g, '-') !== req.params.item;
			//filter through data objects and replace all white space Walk Dog => Walk-Dog
			// if Walk-Dog !== req.params.item (Mow-Lawn) return if it is TRUE
			// Walk-Dog !== Walk-Dog FALSE Filter it
		//});
		// var jsonData = JSON.stringify(data);
		// fs.writeFile('myjsonfile.json', jsonData, 'utf8', function(){
		// });
		// res.json(data);
		Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});
	

};