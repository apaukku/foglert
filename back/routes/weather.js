var express = require('express');
var weatherService = require('../service/weather');
var router = express.Router();


router.get('/', function(req, res, next) {

  weatherService.getHourly('Espoo', (json)=>{
    console.log('weather-data-ready ');
    console.log(json);
    res.setHeader('Content-Type', 'application/json');
    res.send(json);
  });

});

module.exports = router;
