var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var models = require('../models');
var Page = models.Page;
var User = models.User;
var mongoose = require('mongoose');




describe('Page model', function() {

  beforeEach(function (done) {
    mongoose.disconnect();
    mongoose.connect('mongodb://localhost/db-test', function(){
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'mongodb connection error: '));
      mongoose.connection.db.dropDatabase(function(){
        done();
      });
    });
  });

  var page;
  beforeEach(function(done) {
      Page.create({
          title: 'foo',
          content: 'foo',
          tags: ['foo', 'bar']
      });
      Page.create({
          title: 'food bar',
          content: 'food bar',
          tags: ['bar']
      });
      Page.create({
          title: 'bar',
          content: 'bar',
          tags: ['foo', 'foodbar']
      },done);
  });

  describe('Validations', function() {
        xit('should error without title', function(done) {
          page.validate(function(err) {
            expect(err.errors).to.have.property('title');
            done();
          }, done);
        });

        xit('should error without content', function(done) {
          page.validate(function(err){
            expect(err.errors).to.have.property('content');
            done();
          }, done);
        });
    });

    describe('Statics', function() {
        describe('findByTag', function() {
            xit('should get pages with the search tag', function(done) {
              Page.findByTag('foo').then(function(pages){
                console.log(pages);
                var pageArray = Array.prototype.slice.call(pages);
                var trueFalse = pageArray.every(function(page){
                  return page.tags.indexOf("foo") > -1;
                });

                expect(trueFalse).to.be.true;
                done();
              })
              .then(null, done);
            });

            xit('does not get pages without the search tag', function(done) {
              Page.findByTag('falafel').then(function (pages) {
                  expect(pages).to.have.lengthOf(0)
                  done()
              })
              .then(null, done);
          });
        });
    });

    describe('Methods', function() {
        describe('findSimilar', function() {
            it('should never get itself', function(done) {
              Page.findOne({ title: "food bar"})
              .then(function(page){
                  page.findSimilar()
                  .then(function(simPages){
                    assert.equal(simPages.length, 1);
                    done();
                  })
                  .then(null, done);
              })
              .then(null, done);

            });
            xit('should get other pages with any common tags', function() {});
            xit('should  not get other pages without any common tags', function() {});
        });
    });

    describe('Virtuals', function() {
        describe('route', function() {
            xit('should return the url_name prepended by "/wiki/"', function() {});
        });
    });

    describe('Hooks', function() {
        xit('should set urlTitle based on title before validating', function() {});
    });

});
