var pokerBroadcaster = require('./poker-broadcaster.js');

getUserUpdateList = function (room) {
    return {
        type: 'userlist',
        data: room.pokerUsers.getAll()
    };
};

broadcastUsers = function(room) {
    var pushData = getUserUpdateList(room);
    pokerBroadcaster.broadcast(pushData, room);
};

getCardUpdateList = function (room) {
    return {
        type: 'carddisplay',
        data: room.pokerCards.getAll()
    };
};

broadcastCards = function(room) {
    var pushData = getCardUpdateList(room);
    pokerBroadcaster.broadcast(pushData, room);   
};

getUserstoryUpdate = function(room) {
    return {
        type: 'userstory',
        userstory: room.pokerUserstory.get()
    };
};

broadcastUserstory = function(room) {
    var pushData = getUserstoryUpdate(room);
    pokerBroadcaster.broadcast(pushData, room);
};