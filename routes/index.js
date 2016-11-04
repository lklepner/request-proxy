var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');

// GET home page -- this is the only request that won't be proxied
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Request Proxy' });
});


// catch all for proxy requests
router.get('*', function(req, res, next) {

	var newHost = 'dev.api.raven.cloud.twc.net';
	console.log('request params: ' + req.params[0]);
	var newURL = 'https://' + newHost + req.params[0];
	console.log('newURL: ' + newURL);

	var proxyRequest = request({url: newURL, rejectUnauthorized: false}, onResponse);

	function onResponse(err, response, body){
		if (err){
			console.log(err);
			res.send(err);
		} else {
			// uncomment the line below to see all of the request response elements
			//console.log(util.inspect(response));
			
			res.set(response.headers);
			res.send(body);
		}
	}

});



module.exports = router;

