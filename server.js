var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.listen(PORT, function() {
	console.log('app is listening on port ' + PORT);
});

var tables = [];
var waitList = [];

// routes
app.get('/', function(req, res) {
	res.send(home.html);
})

app.get('/reserve', function (req, res) {
	res.send(reserve.html);
});

app.get('/tables', function (req, res) {
	res.send(tables.html);
});

// api routes
app.get('/api/tables', function (req, res) {
	res.json(tables);
});

app.get('/api/waitlist', function (req, res) {
	res.json(waitList);
});

// add new customer
app.post('/api/tables', function(req, res) {
	var newCustomer = req.body;
	if(tables.length < 5) {
		tables.push(newCustomer);
		return true;
	} else {
		waitList.push(newCustomer);
		return false;
	}
	res.json(newCustomer);
});