var weatherService = require('./weather-apixu');

var weather = {
  getHourly:(location,callback) => {
    weatherService.forecastWeather(location,5,(json)=>{
      callback(json);
    });
  }
}
module.exports = weather;
