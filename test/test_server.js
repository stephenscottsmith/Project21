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
        server.UserList.addUser('test', 'test', done);
        server.UserList.users.should.have.key('test');
    });
    it('should return false because of adding a duplicate user', function(done) {
        server.UserList.addUser('test', 'test', done).should.be.false;
    });
    it('should not remove a user because of invalid passsword', function() {
        server.UserList.removeUser('test', 'nottest', done).should.throw();
    });
    it('should remove a user because of a valid password', function() {
        server.UserList.removeUser('test', 'test', done);
        server.UserList.users.should.not.have.key('test');
    });
    it('should remove a user without a password', function() {
        server.UserList.addUser('test', 'test', done);
        server.UserList.removeUserAdmin('test', done);
        server.UserList.users.should.not.have.key('test');
    });
});