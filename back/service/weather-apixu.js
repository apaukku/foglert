http = require('http');

var apiKey = 'a00488d2822040f2ae8172923170605'

var options = {
  host: 'api.apixu.com',
  port: 80,
  path: '/v1/current.json?key=' + apiKey + '&q=',
  method: 'GET'
};





exports.forecastWeather = function forecastWeather(query, noOfDays, callback){
	options.path = '/v1/forecast.json?key=' + apiKey + '&q=' + query + '&days=' + noOfDays;
	http.request(options, function(res) {
    var body = '';
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
		   body += chunk;
	  });
	  res.on('end', function () {
      console.log(body);
      callback(body);
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);

    }).end();
}
