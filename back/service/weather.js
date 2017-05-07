var weatherService = require('./weather-apixu');

var weather = {
  getHourly:(location,callback,callback_error) => {
    weatherService.forecastWeather(location,5,(json)=>{
      callback(json);
    });
  }
}
module.exports = weather;
