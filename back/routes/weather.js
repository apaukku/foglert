var express = require('express');
var weatherService = require('../service/weather');
var router = express.Router();


router.get('/:location', function(req, res, next) {

  weatherService.getHourly(req.params.location, (json)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(json);
  });

});

module.exports = router;
