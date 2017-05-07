var request = require('supertest');
var assert = require("assert");

describe('testing weather', function () {
  var server = require('../app');



  it('responds to /weather/Espoo', (done)=> {
  request(server)
    .get('/weather/Espoo')
    .expect(200, done);
  });



  it('returns location specific results /weather/:location', (done)=> {
  request(server)
    .get('/weather/Espoo')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err,res){
      assert.equal(res.body.location.name, "Espoo");
      done();
    });
  });

});
