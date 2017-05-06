var request = require('supertest');
describe('testing weather', function () {
  var server = require('../app');



  it('responds to /weather', function testSlash(done) {
  request(server)
    .get('/weather')
    .expect(200, done);
  });

  it('returns json from /weather', function testSlash(done) {
  request(server)
    .get('/weather')
    .expect(200)
    .expect('Content-Type', /json/,done);
  });

});
