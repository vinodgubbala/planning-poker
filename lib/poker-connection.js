var EventEmitter = require('events').EventEmitter;
var util = require('util');

var PokerConnectionHandler = function() {};
util.inherits(PokerConnectionHandler, EventEmitter);
var emitterOn = EventEmitter.prototype.on;

PokerConnectionHandler.prototype.connection = null;

PokerConnectionHandler.prototype.pokerData = {};

PokerConnectionHandler.prototype.init = function(room) {
    this.room = room;
    this.pokerData = {
        "room": room,
        "users": room.pokerUsers,
        "carddisplay": room.pokerCards
    };
};

PokerConnectionHandler.prototype.setConnection = function(connection) {
    var me;
    me = this;
    this.connection = connection;
    /*this.connection.on('message', function(message) {
        me.onmessage.call(me, message);
    });*/

    connection.on('disconnect', function(reasonCode, description) {
        me.onclose.call(me, reasonCode, description);
    });
};
PokerConnectionHandler.prototype.on = function(event, fn) {
    var me = this;
    me.connection.on(event, (data) => {
        me.emit(event, data, me);
    });
    emitterOn.apply(this, arguments);
};

PokerConnectionHandler.prototype.onclose = function(reasonCode, description) {
    if (typeof this.user != 'undefined') {
        this.pokerData.carddisplay.removeCard(this.user.id);
        this.pokerData.users.remove(this.user.id);

        broadcastUsers(this.pokerData.room);
        broadcastCards(this.pokerData.room);
    }
    
    // When the connection is closed, remove all event listeners
    //
    this.connection.removeAllListeners();
    //
    this.removeAllListeners();
};

PokerConnectionHandler.prototype.onmessage = function(message) {
    if (message.type === 'utf8') {
        var messageData = JSON.parse(message.utf8Data);
        // Emit message type as event
        this.emit(messageData.type, messageData, this);
    }
};

module.exports.getNewHandler = function() {
    return new PokerConnectionHandler();
};