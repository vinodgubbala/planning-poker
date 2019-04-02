module.exports.socketIoServer = null;

module.exports.init = function(socketIoServer) {
	this.socketIoServer = socketIoServer;
};

module.exports.broadcast = function(message, room) {
	console.log('tried broadcasting', message);
	if (room) {
		
		this.socketIoServer.to(room.name).emit(message.type, message);
	} else {
		this.socketIoServer.emit(message.type, message);
	}
	//this.socketIoServer.broadcastUTF(JSON.stringify(message));
};