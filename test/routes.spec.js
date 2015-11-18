var supertest= require('supertest'),
	app = require('../app'),
	agent = supertest.agent(app);


describe('GET /', function(){
  it('Check that home page exists', function(done){
    supertest(app)
      .get('/')
      .expect(200, done);
  })
})

describe('GET /wiki/:urlTitle', function(){
  it('Check that wikis exists', function(done){
    supertest(app)
      .get('/wiki/foo')
      .expect(200, done);
  })
  it('Check that wiki/badTitle doesnt exist', function(done){
    supertest(app)
      .get('/wiki/boo')
      .expect(404, done);
  })
})

describe('GET /add', function () {
        it('gets 200', function (done) {
        supertest(app)
        	.get('/wiki/add')
        	.expect(200, done);
        });
    });


describe('GET /wiki/:urlTitle/similar', function() {
    it('gets 404 for page that doesn\'t exist', function(done) {
    	supertest(app)
    		.get('/wiki/fo/similar')
    		.expect(404, done) 
    });
    it('gets 200 for similar page', function(done) {
    	supertest(app)
    		.get('/wiki/foo/similar')
    		.expect(200, done)
    });
});

describe('POST /wiki/add', function() {
    it("creates in db", function(done) {
    	supertest(app)
    	.post("/")
    	.send({ title: "Bobs Page", content: "here it is"})
    	.expect(201,done)


    });
});



