var EventEmitter = require('events').EventEmitter,
    PokerUsers = require('./poker-users.js'),
    PokerUserstory = require('./poker-userstory.js'),
    PokerCards = require('./poker-cards.js'),
    util = require('util');

var PokerRoom = function(name) {
    this.name = name;
    
    this.pokerUsers = new PokerUsers();
    this.pokerCards = new PokerCards();
    this.pokerUserstory = new PokerUserstory();
    /*
    this.on('room-created', function(name) {
        this.name = name;
    }, this);*/
};
util.inherits(PokerRoom, EventEmitter);

PokerRoom.prototype.name = null;

PokerRoom.prototype.pokerUsers = null;

PokerRoom.prototype.pokerCards = null;

PokerRoom.create = function(roomDetails) {
    return new PokerRoom(roomDetails);
};


module.exports = PokerRoom;