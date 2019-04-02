var pokerUser = require('./poker-user.js'),
    pokerBroadcaster = require('./poker-broadcaster.js'),
    crypto = require('crypto');

module.exports = PokerEventHandlers = {};

PokerEventHandlers.registerAllForConnectionHandler = function(connectionHandler) {
    connectionHandler.on('login', PokerEventHandlers.loginListener);
    connectionHandler.on('get-initial-data', PokerEventHandlers.getInitialDataListener);
    connectionHandler.on('play-card', PokerEventHandlers.playCardListener);
    connectionHandler.on('show-cards', PokerEventHandlers.showCardsListener);
    connectionHandler.on('reset-cards', PokerEventHandlers.resetCardsListener);
    connectionHandler.on('post-userstory', PokerEventHandlers.postUserstoryListener);
    connectionHandler.on('post-chat-message', PokerEventHandlers.postChatMessageListener);
    connectionHandler.on('reset-room', PokerEventHandlers.resetRoomListener);
}

PokerEventHandlers.baseListener = function(messageData, sendData) {
    var channel = messageData.channel || 'global';
    connection.sendUTF(JSON.stringify(sendData));
}

PokerEventHandlers.loginListener = function(messageData) {
    var user,
        sendData;
    // For callbacks
    var connection = this.connection,
        room = connection.room;
    //var baseData = PokerEventHandlers.baseListener(messageData, sendData);

    user = messageData.user;
    if (typeof user.id !== 'undefined') {
        room.pokerUsers.add(user);
        
        sendData = {
            type: 'login',
            user: user
        };
        connection.emit(sendData.type, sendData);
        broadcastUsers(room);
    } else {
        user = pokerUser.create(user);
        user.on('created', function(newUser) {
            connection.room.pokerUsers.add(newUser);
            sendData = {
                type: 'login',
                user: newUser
            };
            connection.emit(sendData.type, sendData);
            broadcastUsers(room);
        });
    }
    this.user = user;
    var cardData = room.pokerCards.getCard(user.id);
    // If a new card could be set, broadcast
    if (cardData) {
        sendData = {
            type: 'selected-card',
            card: cardData
        }
        connection.emit(sendData.type, sendData)
    }
};

PokerEventHandlers.getInitialDataListener = function(messageData) {
    var room = this.connection.room,
        datasToEmit = [
            getUserUpdateList(room),
            getCardUpdateList(room),
            getUserstoryUpdate(room)
        ];
    for (let index = 0; index < datasToEmit.length; index++) {
        const data = datasToEmit[index];
        this.connection.emit(data.type, data);
    }
    /*this.connection.emit(getUserUpdateList());
    this.connection.emit(getCardUpdateList());
    this.connection.emit(getUserstoryUpdate());*/
};


PokerEventHandlers.playCardListener = function(messageData) {
    var room = this.connection.room,
        cardSet = room.pokerCards.setCard(messageData.userId, messageData);
    // If a new card could be set, broadcast
    if (cardSet) {
        broadcastCards(room);
    }
};

PokerEventHandlers.showCardsListener = function(messageData) {
    var room = this.connection.room,
        pushData = {
            type: 'show-cards'
        };
    room.pokerCards.show = true;
    pokerBroadcaster.broadcast(pushData, room);
};

PokerEventHandlers.resetCardsListener = function(messageData) {
    var room = this.connection.room;
    room.pokerCards.reset();
    broadcastCards(room);
};

PokerEventHandlers.postUserstoryListener = function(messageData) {
    var room = this.connection.room;
    room.pokerUserstory.set(messageData.userstory);
    broadcastUserstory(room);
};

PokerEventHandlers.postChatMessageListener = function(messageData) {
    chatMessage = {
        type: 'new-chat-message',
        text: messageData.text,
        user: this.user
    };
    pokerBroadcaster.broadcast(chatMessage, this.connection.room);
};

PokerEventHandlers.resetRoomListener = function(messageData) {
    var room = this.connection.room;
    room.pokerUserstory.remove();
    room.pokerCards.reset();
    broadcastCards(room);
    broadcastUserstory(room);

    var pushData = {
        type: 'reset-room'
    };
    pokerBroadcaster.broadcast(pushData, room);
};
