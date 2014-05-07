var should = require('should');
var assert = require('assert');
var request = require('supertest');
var server = require('../server.js');

describe('Routing', function() {
    var url = 'http://localhost:3000';

    
})

describe('UserList', function () {
    it('should initialize the users', function() {
        server.UserList.initializeUserList();
        server.UserList.users.should.be.ok;
    });
    it('should add a user', function(done) {
        server.UserList.addUser('test', 'test', function(err, res) {
            res.should.be.true;
            server.UserList.users.should.have.property('test');
            done();
        });
    });
    it('should should not add a duplicate user', function(done) {
        server.UserList.addUser('test', 'test', function(err, res) {
            err.should.be.ok;
            done();
        });
    });
    it('should not remove a user because of invalid passsword', function(done) {
        server.UserList.removeUser('test', 'nottest', function(err, res) {
            err.should.be.ok;
            done();
        });
    });
    it('should remove a user because of a valid password', function(done) {
        server.UserList.removeUser('test', 'test', function(err, res) {
            server.UserList.users.should.not.have.property('test');
            res.should.be.true;
            done();
        });
    });
    it('should remove a user without a password', function(done) {
        server.UserList.addUser('test', 'test', function() {
            server.UserList.removeUserAdmin('test', function(err, res) {
                server.UserList.users.should.not.have.key('test');
                res.should.be.true;
                done();
            });
        });
        
    });
});

describe('ScoreList', function() {
    it('should initialize the scores', function() {
        server.ScoreList.initializeScoreList();
        server.ScoreList.scores.should.be.ok;
    });

    it('should add a score', function(done) {
        server.UserList.addUser('test', 'test', function(err, res) {
            res.should.be.true;
            server.ScoreList.addScore('test', 92, function(err2, res2) {
                res2.should.be.true;
                server.ScoreList.scores.should.containDeep([{username: "test", score: 92}]);
                done();
            });
        });
    });

    it('should change a score', function(done) {
        server.ScoreList.updateScore('test', 90, function(err, res) {
            res.should.be.true;
            server.ScoreList.scores.should.containDeep([{username: "test", score: 90}]);
            done();
        });
    });

    it('should get a score', function() {
        server.ScoreList.getScore('test').should.equal(90);
    });

    it('should remove a score', function(done) {
        server.ScoreList.removeScore('test', function(err, res) {
            res.should.be.true;
            server.ScoreList.scores.should.not.containDeep({username: 'test', score: 90});
            done();
        });
    });

    it('should not remove a score that doesn\'t exist', function(done) {
        server.ScoreList.removeScore('test', function(err, res) {
            err.should.be.ok;
            done();
        });
    });

    it('should not update a score that doesn\'t exist', function(done) {
        server.ScoreList.updateScore('test', 95, function(err, res) {
            err.should.be.ok;
            done();
        });
    });
});

describe('GET', function() {
    it('should return the index', function(done) {
        request(server.app).get('/').expect(200, done);
    });

    it('should return high scores in json format', function(done) {
        request(server.app).get('/highscore/10')
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .expect(200, done);
    });
});

