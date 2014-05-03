var should = require('should');
var assert = require('assert');
var request = require('supertest');
var server = require('../server.js');
console.log(server);

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
    it('')
});