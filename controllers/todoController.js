var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var data = [
	{item: 'Walk Dog'},
	{item: 'Take Out Garbage'},
	{item: 'Read More'},
	{item: 'Code More'},

];

module.exports = function(app){

	app.get('/todo', function(req, res){
		res.render('todo', {todos: data});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		data.push(req.body);
		res.json(data);
	});

	app.delete('/todo/:item', urlencodedParser, function(req, res){
		data = data.filter(function(todo) {
			return todo.item.replace(/ /g, '-') !== req.params.item;
			//filter through data objects and replace all white space Walk Dog => Walk-Dog
			// if Walk-Dog !== req.params.item (Mow-Lawn) return if it is TRUE
			// Walk-Dog !== Walk-Dog FALSE Filter it
		});
		res.json(data);
	});

};