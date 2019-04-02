var pokerRoom = require('./poker-room.js'),

PokerRooms = {};

PokerRooms.roomsList = {};

PokerRooms.remove = function(roomName) {
	this.roomsList[roomName] = null;
    delete this.roomsList[roomName];
};

PokerRooms.add = function(room) {
	this.roomsList[room.name] = room;
};

PokerRooms.getOrAdd = function(roomName) {
    if (!this.roomsList[roomName]) {
        this.add(pokerRoom.create(roomName));
    }
	return this.roomsList[roomName];
};

PokerRooms.getAll = function() {
	return this.roomsList;
};

module.exports = PokerRooms;