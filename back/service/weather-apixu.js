http = require('http');
console.log(process.env);
const apiKey = process.env.APIXU_APIKEY;

const options = {
  host: 'api.apixu.com',
  port: 80,
  path: '/v1/current.json?key=' + apiKey + '&q=',
  method: 'GET'
};

const sunrise_start = 0;
const sunrise_end = 3;
const sunset_start = -2;
const sunset_end = 0;




exports.forecastWeather = function forecastWeather(query, noOfDays, callback){
	options.path = '/v1/forecast.json?key=' + apiKey + '&q=' + query + '&days=' + noOfDays;
	http.request(options, function(res) {
    var body = '';
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
		   body += chunk;
	  });
	  res.on('end', function () {
      if(!JSON.parse(body).error)
        callback(cleanDates(body));
      else
        callback(body);
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        callback(err.message);

    }).end();
}

function cleanDates(data){
  data = JSON.parse(data);

  var dates = data.forecast.forecastday;
  var sunrise_h,sunset_h;
  for (var i = 0, len = dates.length; i < len; i++) {
    sunrise_h = new Date(dates[i].date+" "+dates[i].astro.sunrise).getHours();
    sunset_h = new Date(dates[i].date+" "+dates[i].astro.sunset).getHours();
    dates[i].hour = cleanHours(dates[i].hour,sunrise_h,sunset_h);

  }
  data.forecast.forecastday = dates;
  return JSON.stringify(data);
}

function cleanHours(hours,sunrise_h,sunset_h){
  var sanitized_hours = [];
  var sanitized_hour,hour,time;
  for (var i = 0, len = hours.length; i < len; i++) {
    hour = hours[i];
    sanitized_hour = {};
    time = (new Date(hour.time_epoch*1000).getUTCHours()+3-1)%24; //+3 finnish time & -1 first hour is 0

    sanitized_hour.time_epoch = hour.time_epoch;
    sanitized_hour.hour = time;
    sanitized_hour.is_day = hour.is_day;
    sanitized_hour.temp_c = hour.temp_c;
    sanitized_hour.wind_kph = hour.wind_kph;
    sanitized_hour.humidity = hour.humidity;
    sanitized_hour.cloud = hour.cloud;
    sanitized_hour.dewpoint_c = hour.dewpoint_c;
    sanitized_hour.vis_km = hour.vis_km;
    sanitized_hour.precip_mm = hour.precip_mm;

    sanitized_hour.is_sunrise = isSunriseOrSunset(time,sunrise_h,sunrise_start,sunrise_end);
    sanitized_hour.is_sunset = isSunriseOrSunset(time,sunset_h,sunset_start,sunset_end);
    sanitized_hour.is_fog = isFog(sanitized_hour.humidity,sanitized_hour.temp_c,sanitized_hour.dewpoint_c,sanitized_hour.cloud,sanitized_hour.wind_kph);

    sanitized_hour.condition = hour.condition;

    sanitized_hours[i] = sanitized_hour;

  }

  return sanitized_hours;
}

function isSunriseOrSunset(hour,sunrise_h,sunrise_start,sunrise_end){
  if(hour >= sunrise_h+sunrise_start && hour<= sunrise_h+sunrise_end){
    return 1;
  }else {
    return 0;
  }
}

function isFog(humidity,temp_c,dewpoint_c,cloud,wind_kph){
  if( wind_kph > 20) return 0;
  if( humidity < 98) return 0;
  if( Math.abs(temp_c - dewpoint_c) > 2) return 0;
  if( cloud > 75) return 0;
  return 1;
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
