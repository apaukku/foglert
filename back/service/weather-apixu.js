http = require('http');

const apiKey = 'a00488d2822040f2ae8172923170605'

const options = {
  host: 'api.apixu.com',
  port: 80,
  path: '/v1/current.json?key=' + apiKey + '&q=',
  method: 'GET'
};

const sunrise_start = -1;
const sunrise_end = 2;
const sunset_start = -2;
const sunset_end = 1;




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

function clean(data){
  var dates = data.forecast.forecastday;
  var date,sunrise_h,sunset_h;
  for (var i = 0, len = dates.length; i < len; i++) {
    date = dates[i];

  }

}
