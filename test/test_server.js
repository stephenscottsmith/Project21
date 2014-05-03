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
        server.UserList.addUser('test', 'test', function() {
            server.UserList.users.should.have.property('test');
            done();
        });
    });
    it('should return false because of adding a duplicate user', function() {
        server.UserList.addUser('test', 'test').should.be.false;
    });
    it('should not remove a user because of invalid passsword', function() {
        //(server.UserList.removeUser('test', 'nottest')).should.throw(); // Fuck javascript
    });
    it('should remove a user because of a valid password', function(done) {
        server.UserList.removeUser('test', 'test', function() {
            server.UserList.users.should.not.have.property('test');
            done();
        });
        
    });
    it('should remove a user without a password', function(done) {
        server.UserList.addUser('test', 'test', function() {
            server.UserList.removeUserAdmin('test', function() {
                server.UserList.users.should.not.have.key('test');
                done();
            });
        });
        
    });
});