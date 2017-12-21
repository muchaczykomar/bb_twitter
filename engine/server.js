var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var Twit = require("twit");

var client = null;

function connectToTwitter(){
	client = new Twit({
		consumer_key	      :	"4o3nNkzVoJeCjjVm29d4V9iB7",
		consumer_secret	    : "VkAjqKqhei1vFo4CpUUAA6c17mQIrk4XRSjtFyvYOIDr7Mj03j",
		access_token	      : "1389039060-dY5lKU1gOfRNFY7kkExlpy3zyusKj1eoa4LDZMG",
		access_token_secret	: "qzhWCJiDVwUvT7ZKX5OQFC3hTpXdUlTr8ha0fvnAf7OtL"
	});
}
//Make the client connect to Twitter
connectToTwitter();
//Additional code to allow CORS requests
//additional setup to allow CORS requests
var allowCrossDomain = function(req, response, next) {
	response.header('Access-Control-Allow-Origin', "http://localhost");
	response.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
	response.header('Access-Control-Allow-Headers', 'Content-Type');
	if ('OPTIONS' == req.method) {
		response.send(200);
	}
	else {
		next();
	}
};
app.use(allowCrossDomain);
//Parses the JSON object given in the body request
app.use(bodyParser());
//Return the Twitter timeline of the current user
app.get('/timeline', function (request, response) {
	response.header('Access-Control-Allow-Origin', '*');
	client.get('statuses/home_timeline', {}, function (err, reply) {
		if(err){
		response.send(404);
		}
		if(reply){
			response.json(reply);
		}
	});
});
app.get('/profile', function(request, response){
	response.header('Access-Control-Allow-Origin', '*');
	client.get('users/show', {screen_name: 'mateusz_mucha'}, function (err, reply) {
		if(err){
			console.log('Error: ' + err);
			response.send(404);
		}
		if(reply){
		/// console.log('Reply: ' + reply);
			response.json(reply);
		}
	});
});
app.get('/search/:query', function (request, response) {
	response.header('Access-Control-Allow-Origin', '*');
	//search term is
	var searchTerm = request.params.query;
	client.get('search/tweets', { q: searchTerm, count: 100 }, function(err, reply) {
		if(err){
			console.log('Error: ' + err);
			response.send(404);
		}
		if(reply){
			// console.log('Reply: ' + reply);
			response.json(reply);
		}
	});
});
app.use(express.static(__dirname));
app.get('/',function(req,res){
	res.sendFile("index.html");
});
//start up the app on port 8080
app.listen(8080);
