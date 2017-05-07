var express = require('express');
var weatherService = require('../service/weather');
var router = express.Router();


router.get('/:location', function(req, res, next) {

  weatherService.getHourly(req.params.location, (json)=>{
    res.setHeader('Content-Type', 'application/json');
    if(JSON.parse(json).error){
        res.status(500).send({ error: 'Fetching weather data for the given location failed' })
    }
    else {
        res.send(json);
    }

  });

});

module.exports = router;
